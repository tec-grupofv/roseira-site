import { Image, Play } from "lucide-react";
import { useState } from "react";
import type { RequirementPageConfig } from "./RequirementPage";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

type MediaTab = "fotos" | "videos";
const photos = [
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=620&fit=crop&auto=format", alt: "Registro de espaço urbano" },
  { src: "https://images.unsplash.com/photo-1560780448-fd139b7ba3fa?w=900&h=620&fit=crop&auto=format", alt: "Registro institucional" },
  { src: "https://images.unsplash.com/photo-1565832077366-f22d1a0dd598?w=900&h=620&fit=crop&auto=format", alt: "Registro de atividade municipal" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&h=620&fit=crop&auto=format", alt: "Registro educacional" },
  { src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=620&fit=crop&auto=format", alt: "Registro esportivo" },
  { src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&h=620&fit=crop&auto=format", alt: "Registro de evento" },
];

export default function GaleriaFotosPage({ onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  const [activeTab, setActiveTab] = useState<MediaTab>("fotos");
  return <div className="secretaria-detail-view galeria-page-view"><section className="site-internal-hero secretaria-detail-hero galeria-hero"><div className="max-w-7xl mx-auto px-4"><SiteBreadcrumb items={[{ label: "Início", onClick: onBackHome }, { label: "A Prefeitura" }, { label: "Galeria de Fotos" }]} /><div className="secretaria-detail-hero-row"><div><h1 className="site-title">Galeria de Fotos e Vídeos</h1><p className="site-subtitle">Registros visuais de eventos, obras, atividades e ações da Prefeitura Municipal de Roseira.</p></div></div></div></section><nav className="secretaria-detail-tabs galeria-page-tabs" aria-label="Tipo de mídia"><div className="max-w-7xl mx-auto px-4"><button type="button" role="tab" aria-selected={activeTab === "fotos"} className={activeTab === "fotos" ? "galeria-tab-active site-card-title" : "site-card-title"} onClick={() => setActiveTab("fotos")}>Fotos</button><button type="button" role="tab" aria-selected={activeTab === "videos"} className={activeTab === "videos" ? "galeria-tab-active site-card-title" : "site-card-title"} onClick={() => setActiveTab("videos")}>Vídeos</button></div></nav><section className="secretaria-detail-main galeria-main"><div className="max-w-7xl mx-auto px-4">{activeTab === "fotos" ? <div className="galeria-photo-grid">{photos.map((photo) => <figure className="galeria-photo-card" key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption><Image aria-hidden="true" /> {photo.alt}</figcaption></figure>)}</div> : <div className="galeria-video-grid">{photos.slice(0, 4).map((photo, index) => <a className="galeria-video-card" href="#conteudo-principal" key={photo.src} title={`Vídeo ${index + 1}`}><img src={photo.src} alt="" loading="lazy" /><span><Play aria-hidden="true" /></span><strong>Vídeo institucional {index + 1}</strong></a>)}</div>}</div></section></div>;
}
