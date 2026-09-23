# Relatório de auditoria de acessibilidade

## 1. Resumo executivo

- **Projeto:** Prefeitura Municipal de Roseira.
- **Caminho auditado:** `\\srv-fv01\\Desenvolvimento\\Dev\\Mariana\\Workspace\\Prefeitura-de-Roseira-Site`.
- **Cópia de execução:** `C:\\Users\\user\\Documents\\Codex\\runtime\\Prefeitura-de-Roseira-Site`.
- **Versão:** `prefeitura-de-roseira-site@1.0.0`; branch e commit não verificados porque o checkout UNC não pôde ser usado diretamente pelo Git.
- **Data:** 1º de setembro de 2026.
- **Conclusão:** conformidade parcial. A aplicação possui estrutura semântica, controles de acessibilidade, formulários rotulados, abas e suporte a alto contraste/reduced motion, mas ainda há riscos importantes em foco após navegação, formulários, tabelas, links externos, conteúdo provisório, integração VLibras e validação manual.
- **Cobertura estimada:** análise estática dos componentes React, páginas, estilos, `index.html`, script de checagem, build e resposta HTTP. Não equivale a certificação e não permite afirmar 100% de conformidade.

## 2. Ambiente e metodologia

- **Framework:** React 19.
- **Linguagem:** TypeScript/TSX e CSS.
- **Bundler:** Vite 8.2.1.
- **Gerenciador:** npm.
- **Comandos executados:** `npm.cmd run a11y:check`, `npm.cmd run build` e `Invoke-WebRequest http://localhost:8443/`.
- **URL local:** `http://localhost:8443/`; HTTP 200 e marcador `#root` confirmados.
- **Rotas/fluxos incluídos:** home, notícias, detalhe de notícia, concursos, licitações, detalhe de licitação, leis, decretos, portarias, secretarias, detalhe de secretaria, FAQ, requisitos/serviços, busca, menu, cookies, newsletter, contato, mapas e VLibras.
- **Navegadores/SO/leitores de tela:** não informado; nenhum leitor de tela real esteve disponível.
- **Fora do escopo:** validação de dados oficiais/PNTP, backend, envio real de formulários, serviços externos, PDFs reais, autenticação e ambiente de produção.

### Resultados dos comandos

| Comando | Resultado |
|---|---|
| `npm.cmd run a11y:check` | 13/14 verificações passaram; a verificação de servidor falhou porque o script tenta uma URL local diferente do listener atual. |
| `npm.cmd run build` | Sucesso; 1809 módulos transformados. |
| `Invoke-WebRequest http://localhost:8443/` | HTTP 200; `#root` presente. |

## 3. Matriz de conformidade

| ID | Área eMAG/WCAG | Item | Estado | Severidade | Alcance | Evidência | Recomendação |
|---|---|---|---|---|---|---|---|
| RSE-01 | Marcação | idioma principal | Conforme | — | Todo o site | `index.html:2` contém `lang="pt-BR"`. | Manter e validar mudanças de idioma reais. |
| RSE-02 | Marcação | título e descrição | Conforme | — | Documento | `index.html:7-8`. | Atualizar por rota se o portal evoluir para títulos dinâmicos. |
| RSE-03 | Navegação | skip link e destino principal | Conforme | — | Shell | `src/App.tsx:...` renderiza skip link e `main#conteudo-principal`. | Validar foco manualmente. |
| RSE-04 | Navegação | atalhos de teclado | Parcialmente conforme | Média | Shell | `src/App.tsx` implementa atalhos, mas conflito, anúncio e suporte entre navegadores não foram testados. | Documentar e testar `Alt`/`Alt+Shift` com leitor de tela real. |
| RSE-05 | Navegação | página de acessibilidade | Parcialmente conforme | Média | Rota accessibility | Página existe no componente principal, mas o acesso pelo rodapé não foi confirmado como link navegável em todos os contextos. | Garantir link persistente no menu/rodapé e foco inicial. |
| RSE-06 | Teclado/foco | operação de menus, modais e rotas | Não verificado | Alta | Todo o portal | Não houve navegador/controlador disponível para Tab, Escape e retorno de foco. | Executar fluxo completo apenas com teclado. |
| RSE-07 | SPA | foco após navegação | Parcialmente conforme | Alta | Rotas internas | `navigate()` altera estado e rola, mas não reposiciona foco em título/main nem anuncia mudança de página. | Focar `main` ou título após cada navegação e usar anúncio apropriado. |
| RSE-08 | Leitor de tela | árvore e anúncios | Não verificado | Alta | Todo o portal | Nenhum leitor de tela real foi utilizado. | Testar NVDA/Firefox ou combinação equivalente e registrar evidências. |
| RSE-09 | Imagens | textos alternativos | Parcialmente conforme | Média | Imagens e mapas | `a11y:check` confirmou 9 imagens com alt; adequação semântica e imagens externas não foram avaliadas manualmente. | Revisar finalidade de cada alt e alternativas para mapas/imagens complexas. |
| RSE-10 | Formulários | labels, erros e sucesso | Parcialmente conforme | Alta | Contato/newsletter | Existem labels e autocomplete, mas não há evidência completa de `aria-invalid`, `aria-describedby`, foco no erro e anúncio de sucesso em todos os fluxos. | Implementar estados de erro/sucesso e foco programático. |
| RSE-11 | CAPTCHA | barreira cognitiva | Conforme | — | Newsletter | Campo CAPTCHA removido de `src/App.tsx`. | Usar rate limiting e validação no backend quando houver backend. |
| RSE-12 | Tabelas | caption, scope e leitura | Parcialmente conforme | Média | Publicações/requisitos | Há `table`, `thead`, `th` e `td`; não foi confirmado `caption` nem `scope` em todas as tabelas. | Adicionar caption e associação explícita de cabeçalhos. |
| RSE-13 | Contraste | contraste normal, foco e alto contraste | Não verificado | Alta | Todo o site | Há modo alto contraste em `src/App.css`, mas não houve medição automatizada/visual completa. | Medir 4,5:1, foco/componentes e padrão alto contraste. |
| RSE-14 | Zoom/reflow | 200% e espaçamento | Não verificado | Alta | Todo o site | Há media queries e escala de fonte; zoom real não foi testado. | Testar 200%, reflow e espaçamento ampliado. |
| RSE-15 | Movimento | reduced motion | Parcialmente conforme | Média | Carrosséis/animações | `prefers-reduced-motion` e `applyAccessibleFontScale` existem; controle manual de todas as animações não foi validado. | Testar pausa/parada e ausência de movimento prejudicial. |
| RSE-16 | Conteúdo | links externos/downloads | Parcialmente conforme | Média | Portal | Há diversos `target="_blank"`; indicação de nova janela/formato não é uniforme. | Avisar o usuário ou evitar nova instância quando desnecessário. |
| RSE-17 | Terceiros | VLibras | Não verificado | Alta | Widget externo | Script `https://vlibras.gov.br/app/vlibras-plugin.js` e API externa são usados; integração depende da rede e não foi validada em navegador. | Testar carregamento, acionamento pelo header, fallback e Shadow DOM. |
| RSE-18 | Conteúdo | conteúdo provisório/“Não declarado” | Parcialmente conforme | Média | Requisitos/serviços | Várias páginas informam estrutura provisória e campos `Não declarado`. | Publicar dados oficiais ou identificar claramente o estado provisório. |
| RSE-19 | Segurança/privacidade | cookies e formulários | Parcialmente conforme | Média | Consentimento/newsletter/contato | Há banner/modal de cookies e formulários demonstrativos; não houve auditoria de persistência, backend ou privacidade real. | Testar teclado, foco, consentimento e retenção de dados. |
| RSE-20 | Ferramentas | checagem automática | Parcialmente conforme | Observação | Projeto | `a11y:check`: 13/14; falha de servidor decorre da URL esperada pelo script, não prova falha da aplicação. | Atualizar o script para testar `8443`/URL configurável e tratar a limitação. |

## 4. Achados detalhados

### [RSE-06] Fluxos de teclado não comprovados

- **Estado:** Não verificado.
- **Severidade:** Alta.
- **Alcance:** todo o portal.
- **Critério:** eMAG 2.1, 2.2 e 4.4; WCAG 2.1.1, 2.4.7 e 2.4.11.
- **Evidência:** a aplicação possui muitos menus, tabs, dropdowns, diálogos e carrosséis, mas nenhum teste interativo foi executado.
- **Como reproduzir:** abrir a URL e operar o portal somente com Tab, Shift+Tab, Enter, Espaço, setas e Escape.
- **Impacto:** possíveis travas, ordem inadequada ou perda de foco podem impedir usuários de teclado.
- **Correção recomendada:** testar cada componente e documentar retorno de foco, Escape e estados.
- **Critério de aceite:** todos os fluxos essenciais são concluídos sem mouse, com foco visível e ordem lógica.
- **Teste de regressão:** matriz manual desktop/mobile e leitor de tela.

### [RSE-07] Foco não reposicionado após navegação SPA

- **Estado:** Parcialmente conforme.
- **Severidade:** Alta.
- **Alcance:** rotas internas.
- **Critério:** eMAG 2.2; WCAG 2.4.3 e 2.4.4.
- **Evidência:** `navigate()` altera `page` e executa `window.scrollTo`, mas não há foco explícito no título ou `main` após a troca.
- **Como reproduzir:** navegar por um card/menu e observar onde o teclado/leitor de tela permanece.
- **Impacto:** a pessoa pode continuar no cabeçalho sem saber que o conteúdo mudou.
- **Correção recomendada:** focar `main` ou o `h1` da rota e anunciar o título quando a mudança for relevante.
- **Critério de aceite:** cada navegação interna inicia no título/conteúdo da nova página sem anúncio duplicado.
- **Teste de regressão:** home, listagens, detalhes, FAQ e requisito.

### [RSE-10] Estados de erro e sucesso dos formulários

- **Estado:** Parcialmente conforme.
- **Severidade:** Alta.
- **Alcance:** contato e newsletter.
- **Critério:** eMAG 6.2, 6.5 e 6.6; WCAG 3.3.1, 3.3.2, 3.3.3 e 4.1.3.
- **Evidência:** há labels e `required`, mas a auditoria não confirmou associação de erros, `aria-invalid`, `aria-describedby`, foco no primeiro erro ou anúncio consistente de sucesso.
- **Como reproduzir:** enviar formulários vazios e preenchidos apenas por teclado e observar foco/anúncios.
- **Impacto:** erros ou conclusão podem não ser percebidos por leitor de tela.
- **Correção recomendada:** criar resumo de erros, relacionar mensagens aos campos, anunciar sucesso e preservar dados válidos.
- **Critério de aceite:** cada erro é identificado em texto, associado ao campo e anunciado uma única vez.
- **Teste de regressão:** contato, newsletter, cookies e filtros.

### [RSE-13] Contraste e alto contraste sem medição

- **Estado:** Não verificado.
- **Severidade:** Alta.
- **Alcance:** todo o portal.
- **Critério:** eMAG 4.1, 4.2, 4.3 e 4.4; WCAG 1.4.3, 1.4.11 e 1.4.12.
- **Evidência:** `src/App.css` possui regras extensas de alto contraste, links, foco e estados hover, mas não foi executada ferramenta de contraste.
- **Como reproduzir:** ativar alto contraste e medir texto, fundo, bordas e foco em home e páginas internas.
- **Impacto:** cores visualmente aceitáveis podem não atingir os rácios exigidos.
- **Correção recomendada:** medir pares e estados reais, incluindo cards, tabelas, inputs e links.
- **Critério de aceite:** todos os pares aplicáveis atingem o critério de contraste e foco definido.
- **Teste de regressão:** desktop, mobile, hover, foco e modo alto contraste.

### [RSE-17] Dependência externa do VLibras

- **Estado:** Não verificado.
- **Severidade:** Alta.
- **Alcance:** header/widget.
- **Critério:** eMAG 2.2; WCAG 2.1.1, 4.1.2 e 4.1.3.
- **Evidência:** `src/App.tsx` carrega script externo e usa `window.VLibrasWidget.open()`/Shadow DOM.
- **Como reproduzir:** carregar sem cache, bloquear ou liberar o domínio VLibras e testar o botão do header e o botão fixo.
- **Impacto:** serviço indisponível pode deixar o controle sem resposta.
- **Correção recomendada:** oferecer estado de erro compreensível, alternativa oficial e teste de carregamento tardio.
- **Critério de aceite:** o botão funciona após carregamento lento, não duplica o widget e informa falha externa.
- **Teste de regressão:** rede normal, bloqueada e carregamento atrasado.

## 5. Fluxos testados

- **Inicialização/build:** build de produção concluído com sucesso.
- **Servidor:** `http://localhost:8443/` respondeu HTTP 200 e contém `#root`.
- **Checagem automática:** 13/14 verificações passaram; a checagem HTTP interna não encontrou a URL configurada pelo script.
- **Rotas:** identificadas estaticamente no `App.tsx`; não foram todas abertas interativamente.
- **Formulários, modais, abas, busca e carrosséis:** identificados no código; operação manual não verificada.
- **Leitor de tela:** não executado.

## 6. Resultados por ferramenta

| Ferramenta | Resultado | Limitações |
|---|---|---|
| `a11y:check` | 13/14 | Cobertura limitada a regras implementadas no script. |
| Vite build | Sucesso | Não valida usabilidade assistiva. |
| HTTP PowerShell | HTTP 200 | Não valida renderização visual, foco ou árvore ARIA. |
| `rg`/inspeção estática | Executada | Ausência de padrão não prova conformidade. |
| Browser/leitor de tela | Não executado | Nenhuma superfície de navegador disponível. |
| Contraste | Não executado | Requer medição automatizada/manual. |

## 7. Plano priorizado de correção

### P0

- Testar e corrigir teclado/foco nos fluxos essenciais.
- Testar VLibras real e providenciar fallback de indisponibilidade.
- Corrigir erros/sucesso de formulários com anúncios e foco.

### P1

- Reposicionar foco após cada navegação SPA.
- Medir contraste, foco, zoom 200% e reflow.
- Revisar tabelas, captions e scopes.

### P2

- Garantir link persistente para a página de acessibilidade.
- Revisar links externos, novas janelas e downloads.
- Melhorar o script de checagem para aceitar a porta real por variável.

### P3

- Adicionar axe/Lighthouse e testes de teclado ao CI.
- Reavaliar conteúdo provisório e dados `Não declarado` quando as fontes oficiais forem fornecidas.

## 8. Checklist final

| Item | Estado |
|---|---|
| Idioma | Conforme |
| Título/descrição | Conforme |
| Landmarks/skip link | Conforme |
| Atalhos | Parcialmente conforme |
| Página de acessibilidade | Parcialmente conforme |
| Teclado/foco | Não verificado |
| Foco após rota | Parcialmente conforme |
| Leitor de tela | Não verificado |
| Imagens/alt | Parcialmente conforme |
| Formulários | Parcialmente conforme |
| CAPTCHA | Conforme |
| Tabelas | Parcialmente conforme |
| Contraste | Não verificado |
| Zoom/reflow | Não verificado |
| Movimento | Parcialmente conforme |
| VLibras | Não verificado |
| Cookies/privacidade | Parcialmente conforme |

## 9. Evidências

- `index.html:2,8` — idioma e título.
- `src/App.tsx` — shell, rotas, componentes, formulários, tabelas, controles de acessibilidade e VLibras.
- `src/App.css:136-2511` — alto contraste, foco, responsividade e reduced motion.
- `scripts/accessibility-check.mjs` — verificações automatizadas executadas.
- `package.json` — scripts, dependências e versões declaradas.
- `http://localhost:8443/` — HTTP 200 confirmado em 1º de setembro de 2026.

## 10. Limitações e riscos residuais

- Nenhum navegador ou leitor de tela real foi utilizado.
- Não houve teste com NVDA, JAWS, VoiceOver, TalkBack ou DOSVOX.
- Não houve teste de teclado, zoom, reflow, contraste, CSS desativado ou orientação.
- Serviços externos, backend, envio de dados e privacidade real não foram auditados.
- A checagem automática não validou toda a árvore de acessibilidade.
- O checkout UNC não forneceu branch/commit por causa de restrição de segurança do Git.
- Não se pode declarar conformidade total.

## 11. Critérios para encerramento

A auditoria só deve ser encerrada após fechar falhas P0/P1, testar componentes compartilhados, obter evidências de teclado e leitor de tela, validar formulários, modais, navegação, tabelas, mensagens dinâmicas, VLibras, documentos quando existirem e executar regressão.

### Contagem atual

- **Conforme:** 4
- **Parcialmente conforme:** 9
- **Não conforme:** 0
- **Não aplicável:** 0
- **Não verificado:** 5

Severidade dos riscos confirmados ou parciais:

- **Alta:** RSE-06, RSE-07, RSE-08, RSE-10, RSE-13, RSE-14, RSE-17.
- **Média:** RSE-04, RSE-05, RSE-09, RSE-12, RSE-15, RSE-16, RSE-18, RSE-19.
- **Observação:** RSE-20.
