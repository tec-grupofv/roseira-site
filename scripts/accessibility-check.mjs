import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);
const appSource = await fs.readFile(new URL("src/App.tsx", root), "utf8");
const indexSource = await fs.readFile(new URL("index.html", root), "utf8");
const cssSource = await fs.readFile(new URL("src/App.css", root), "utf8");

const checks = [];
function check(name, pass, detail) {
  checks.push({ name, pass, detail });
}

const images = [...appSource.matchAll(/<img\b[\s\S]*?>/g)].map(match => match[0]);
const buttons = [...appSource.matchAll(/<button\b[\s\S]*?>/g)].map(match => match[0]);
const links = [...appSource.matchAll(/<a\b[\s\S]*?>/g)].map(match => match[0]);
const inputs = [...appSource.matchAll(/<(?:input|select|textarea)\b[\s\S]*?>/g)].map(match => match[0]);

check("Documento declara idioma", /<html\b[^>]*\blang=["']pt-BR["']/i.test(indexSource), "index.html deve declarar lang=pt-BR.");
check("Documento possui título", /<title>\s*[^<]+\s*<\/title>/i.test(indexSource), "index.html deve possuir um title não vazio.");
check("Documento possui descrição", /<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+[^>]*>/i.test(indexSource), "index.html deve possuir meta description.");
check("Skip link presente", /className=["']skip-link["']/.test(appSource) && /href=["']#conteudo-principal["']/.test(appSource), "O skip link deve levar ao conteúdo principal.");
check("Main possui destino do skip link", /<main\b[^>]*\bid=["']conteudo-principal["']/.test(appSource), "O main deve possuir id conteudo-principal.");
check("Imagens possuem alt", images.every(tag => /\balt=/.test(tag)), `${images.length} imagens encontradas.`);
check("Formulários têm identificação", inputs.filter(tag => !/type=["']hidden["']/.test(tag)).every(tag => /\bid=/.test(tag) || /\baria-label=/.test(tag) || /\baria-labelledby=/.test(tag)), "Campos precisam de id associado a label ou nome acessível.");
check("Botões possuem type", buttons.every(tag => /\btype=["']button["']|\btype=["']submit["']|\btype=["']reset["']/.test(tag)), `${buttons.filter(tag => !/\btype=/.test(tag)).length} botões sem type explícito.`);
check("Abas usam semântica de tab", /role=["']tablist["']/.test(appSource) && /role=["']tab["']/.test(appSource) && /aria-selected=/.test(appSource), "As categorias devem expor tablist, tab e aria-selected.");
check("Diálogo de preferências identificado", /role=["']dialog["']/.test(appSource) && /aria-modal=["']true["']/.test(appSource) && /aria-labelledby=/.test(appSource), "O modal de cookies precisa de nome e semântica de diálogo.");
check("Movimento reduzido contemplado", /prefersReducedMotion\(\)/.test(appSource) && /prefers-reduced-motion:\s*reduce/.test(cssSource), "Carrosséis e transições devem respeitar prefers-reduced-motion.");
check("Foco visível global", /:focus-visible/.test(cssSource), "Elementos focáveis precisam de indicação visual de foco.");
check("Links placeholder identificados", links.filter(tag => /href=["']#["']/.test(tag)).length === 0, `${links.filter(tag => /href=["']#["']/.test(tag)).length} links ainda usam href="#".`);

try {
  const response = await fetch(process.env.A11Y_URL || "http://localhost:5173/");
  const html = await response.text();
  check("Servidor local responde", response.ok, `HTTP ${response.status}.`);
  check("HTML servido possui lang", /<html\b[^>]*\blang=["']pt-BR["']/i.test(html), "O HTML servido precisa manter lang=pt-BR.");
  check("HTML servido possui ponto de montagem", /<div\b[^>]*\bid=["']root["']/.test(html), "O aplicativo precisa manter o ponto de montagem React.");
} catch (error) {
  check("Servidor local responde", false, `Não foi possível acessar a URL local: ${error.message}`);
}

const failed = checks.filter(item => !item.pass);
for (const item of checks) console.log(`${item.pass ? "PASS" : "FAIL"} | ${item.name} | ${item.detail}`);
console.log(`\nResultado: ${checks.length - failed.length}/${checks.length} verificações passaram.`);
if (failed.length > 0) process.exitCode = 1;
