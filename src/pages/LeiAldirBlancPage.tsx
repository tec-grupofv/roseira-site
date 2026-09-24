import { Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

type Documento = { title: string; url: string };

const documentos: Documento[] = [
  { title: "Edital Lei Aldir Blanc 2", url: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2/download/20/" },
  { title: "Anexo I", url: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2/download/13/" },
  { title: "Anexo II", url: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2/download/14/" },
  { title: "Anexo III", url: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2/download/15/" },
  { title: "Anexo IV", url: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2/download/16/" },
  { title: "Anexo V", url: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2/download/17/" },
  { title: "Anexo VI", url: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2/download/18/" },
  { title: "Anexo VII", url: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2/download/19/" },
];

export default function LeiAldirBlancPage({ onBackHome }: { onBackHome: () => void }) {
  const [preview, setPreview] = useState<Documento | null>(null);

  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setPreview(null);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [preview]);

  return <div className="cadastro-inscricao-page lei-aldir-blanc-page"><section className="site-internal-hero concursos-hero requirement-hero cadastro-inscricao-hero"><div className="max-w-7xl mx-auto px-4"><SiteBreadcrumb items={[{ label: "Início", onClick: onBackHome }, { label: "A Prefeitura" }, { label: "Lei Aldir Blanc 2" }]} /><div className="requirement-hero-grid"><div><h1 className="site-title">Lei Aldir Blanc 2</h1></div></div></div></section><main className="cadastro-inscricao-content"><div className="max-w-7xl mx-auto px-4"><div className="cadastro-inscricao-grid">{documentos.map((documento) => <div className="cadastro-inscricao-download-card" key={documento.url}><strong>{documento.title}</strong><div className="cadastro-inscricao-actions"><button type="button" className="cadastro-inscricao-preview" onClick={() => setPreview(documento)} aria-label={`Visualizar ${documento.title}`} title={documento.title}><Eye aria-hidden="true" /></button><a className="site-green-pill-button cadastro-inscricao-download" href={documento.url} target="_blank" rel="noreferrer" download title={documento.title}>Baixar arquivo</a></div></div>)}</div></div></main>{preview && <div className="cadastro-inscricao-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreview(null); }}><section className="cadastro-inscricao-modal" role="dialog" aria-modal="true" aria-labelledby="lei-aldir-preview-title"><header><h2 id="lei-aldir-preview-title">{preview.title}</h2><button type="button" onClick={() => setPreview(null)} aria-label="Fechar visualização" title="Fechar"><X aria-hidden="true" /></button></header><iframe src={preview.url} title={`Visualização de ${preview.title}`} /><footer><span>Se o arquivo não aparecer, use o botão para abrir ou baixar o documento.</span><a href={preview.url} target="_blank" rel="noreferrer" download title={preview.title}>Baixar arquivo</a></footer></section></div>}</div>;
}