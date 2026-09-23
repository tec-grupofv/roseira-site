import { CalendarDays, Eye, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

export type Noticia = {
  cat: string;
  catColor: string;
  date: string;
  views: number;
  title: string;
  desc: string;
  img: string;
};

function badgeToneClass(color: string) {
  if (color === "#c0392b") return "badge-red";
  if (color === "#1351B4") return "badge-blue";
  if (color === "#FF6B00") return "badge-orange";
  if (color === "#168821") return "badge-green";
  if (color === "#FFCD07") return "badge-yellow";
  return "badge-blue";
}

function NewsMeta({ noticia }: { noticia: Noticia }) {
  return (
    <div className="noticia-meta-row">
      <span className={`sx-0 ${badgeToneClass(noticia.catColor)}`}>{noticia.cat}</span>
      <time dateTime={noticia.date.split("/").reverse().join("-")}>{noticia.date}</time>
      <span className="noticia-meta-views">
        <Eye aria-hidden="true" />
        {noticia.views.toLocaleString("pt-BR")}
      </span>
    </div>
  );
}

function albumImages(noticia: Noticia) {
  return [
    noticia.img,
    noticia.img.replace("w=600&h=360", "w=900&h=540"),
    noticia.img.replace("w=600&h=360", "w=900&h=620"),
  ];
}

export default function NoticiasPage({
  noticias,
  onBackHome,
  onSelectNoticia,
}: {
  noticias: Noticia[];
  onBackHome: () => void;
  onSelectNoticia: (index: number) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [year, setYear] = useState("");

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(noticias.map((noticia) => noticia.cat)))], [noticias]);
  const years = useMemo(() => Array.from(new Set(noticias.map((noticia) => noticia.date.slice(-4)))).sort((a, b) => b.localeCompare(a)), [noticias]);
  const filteredNews = noticias.filter((noticia) => {
    const matchesCategory = activeCategory === "Todas" || noticia.cat === activeCategory;
    const matchesYear = !year || noticia.date.endsWith(year);
    return matchesCategory && matchesYear;
  });

  return (
    <div className="noticias-page-view">
      <section className="site-internal-hero noticias-page-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Notícias" },
          ]} />

          <div className="noticias-page-hero-content">
            <h1 className="site-title">Notícias</h1>
            <p className="site-subtitle">
              Acompanhe comunicados, ações, campanhas e informações oficiais da Prefeitura Municipal de Roseira.
            </p>
          </div>
        </div>
      </section>

      <section className="noticias-page-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="noticias-page-filter">
            <label>
              <span className="site-caps-title">Ano</span>
              <div className="noticias-page-search">
                <CalendarDays aria-hidden="true" />
                <select value={year} onChange={(event) => setYear(event.target.value)}>
                  <option value="">Todos os anos</option>
                  {years.map((itemYear) => (
                    <option key={itemYear}>{itemYear}</option>
                  ))}
                </select>
              </div>
            </label>

            <div className="noticias-page-categories" aria-label="Categorias de notícias">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  title={category}
                  className={activeCategory === category ? "noticias-page-category-active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="noticias-page-heading">
            <h2 className="site-section-title">Todas as notícias</h2>
            <p className="site-text">{filteredNews.length} notícias encontradas</p>
          </div>

          <div className="noticias-page-grid">
            {filteredNews.map((noticia) => {
              const noticiaIndex = noticias.indexOf(noticia);
              return (
                <article key={`${noticia.date}-${noticia.title}`} className="noticias-page-card">
                  <button type="button" onClick={() => onSelectNoticia(noticiaIndex)} title={noticia.title} aria-label={`Ler notícia: ${noticia.title}`}>
                    <div className="noticias-page-image-wrap">
                      <img src={noticia.img} alt="" />
                    </div>
                    <div className="noticias-page-card-body">
                      <NewsMeta noticia={noticia} />
                      <h3 className="site-card-title">{noticia.title}</h3>
                      <p className="site-text">{noticia.desc}</p>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export function NoticiaDetailPage({
  noticia,
  noticias,
  onBackHome,
  onBackList,
  onSelectNoticia,
}: {
  noticia: Noticia;
  noticias: Noticia[];
  onBackHome: () => void;
  onBackList: () => void;
  onSelectNoticia: (index: number) => void;
}) {
  const relatedNews = noticias.filter((item) => item.title !== noticia.title).slice(0, 4);
  const images = albumImages(noticia);

  return (
    <div className="noticia-detail-view">
      <section className="site-internal-hero noticias-page-hero noticia-detail-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Notícias", onClick: onBackList },
            { label: noticia.cat },
          ]} />
          <div className="noticias-page-hero-content">
            <NewsMeta noticia={noticia} />
            <h1 className="site-title">{noticia.title}</h1>
            <p className="site-subtitle">{noticia.desc}</p>
          </div>
        </div>
      </section>

      <section className="noticia-detail-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="noticia-detail-layout">
            <article className="noticia-detail-article">
              <div className="noticia-detail-main-image">
                <img src={noticia.img} alt={noticia.title} />
              </div>
              <div className="noticia-detail-album" aria-label="Álbum de imagens da notícia">
                {images.map((image, index) => (
                  <img key={`${image}-${index}`} src={image} alt="" />
                ))}
              </div>
              <div className="noticia-detail-content">
                <p>
                  {noticia.desc} A iniciativa integra as ações da administração municipal para ampliar o acesso da população às informações, serviços e atividades realizadas no município.
                </p>
                <p>
                  A Prefeitura Municipal de Roseira reforça que a divulgação oficial permite que moradores acompanhem de perto projetos, campanhas, eventos e comunicados de interesse público.
                </p>
                <p>
                  Novas atualizações relacionadas ao tema serão publicadas nos canais oficiais da Prefeitura, mantendo a comunidade informada sobre prazos, atendimentos e próximas etapas.
                </p>
              </div>
              <div className="noticia-detail-actions">
                <button type="button" title="Compartilhar" className="site-action-button button-yellow">
                  <Share2 aria-hidden="true" />
                  Compartilhar
                </button>
              </div>
            </article>

            <aside className="noticia-detail-sidebar" aria-label="Outras notícias">
              <h2 className="site-panel-title">Outras Notícias</h2>
              <div className="noticia-related-list">
                {relatedNews.map((item) => {
                  const itemIndex = noticias.indexOf(item);
                  return (
                    <button key={item.title} type="button" title={item.title} className="noticia-related-card" onClick={() => onSelectNoticia(itemIndex)}>
                      <img src={item.img} alt="" />
                      <span>
                        <NewsMeta noticia={item} />
                        <strong className="site-card-title">{item.title}</strong>
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
