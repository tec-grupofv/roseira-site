import { Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { RequirementPageConfig } from "./RequirementPage";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

type Formulario = { title: string; url: string };

const formularios: Formulario[] = [
  { title: "Requerimento", url: "https://www.roseira.sp.gov.br/pagina/1/cadastro-de-inscricao-municipal/download/6/" },
  { title: "Relação de documentos para comércio ambulante, autônomo e liberal", url: "https://www.roseira.sp.gov.br/pagina/1/cadastro-de-inscricao-municipal/download/5/" },
  { title: "Relação de documentos para abertura de firmas II", url: "https://www.roseira.sp.gov.br/pagina/1/cadastro-de-inscricao-municipal/download/4/" },
  { title: "Relação de documentos para motoristas e taxistas", url: "https://www.roseira.sp.gov.br/pagina/1/cadastro-de-inscricao-municipal/download/2/" },
  { title: "Formulário de cadastro", url: "https://www.roseira.sp.gov.br/pagina/1/cadastro-de-inscricao-municipal/download/1/" },
];

export default function CadastroInscricaoMunicipalPage({ onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  const [preview, setPreview] = useState<Formulario | null>(null);
  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setPreview(null);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [preview]);

  return <div className="cadastro-inscricao-page"><section className="site-internal-hero concursos-hero requirement-hero cadastro-inscricao-hero"><div className="max-w-7xl mx-auto px-4"><SiteBreadcrumb items={[{ label: "Início", onClick: onBackHome }, { label: "Secretarias e Departamentos" }, { label: "Cadastro de Inscrição Municipal" }]} /><div className="requirement-hero-grid"><div><h1 className="site-title">Cadastro de Inscrição Municipal</h1></div></div></div></section><main className="cadastro-inscricao-content"><div className="max-w-7xl mx-auto px-4"><div className="cadastro-inscricao-grid">{formularios.map((formulario) => <div className="cadastro-inscricao-download-card" key={formulario.url}><strong>{formulario.title}</strong><div className="cadastro-inscricao-actions"><button type="button" className="cadastro-inscricao-preview" onClick={() => setPreview(formulario)} aria-label={`Visualizar ${formulario.title}`} title="Visualizar arquivo"><Eye aria-hidden="true" /></button><a className="site-green-pill-button cadastro-inscricao-download" href={formulario.url} target="_blank" rel="noreferrer" download>Baixar arquivo</a></div></div>)}</div></div></main>{preview && <div className="cadastro-inscricao-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreview(null); }}><section className="cadastro-inscricao-modal" role="dialog" aria-modal="true" aria-labelledby="cadastro-preview-title"><header><h2 id="cadastro-preview-title">{preview.title}</h2><button type="button" onClick={() => setPreview(null)} aria-label="Fechar visualização" title="Fechar"><X aria-hidden="true" /></button></header><iframe src={preview.url} title={`Visualização de ${preview.title}`} /><footer><span>Se o arquivo não aparecer, use o botão para abrir ou baixar o documento.</span><a href={preview.url} target="_blank" rel="noreferrer" download>Baixar arquivo</a></footer></section></div>}</div>;
}