import { CalendarDays, ChevronRight, FileText, Search, Scale, ScrollText } from "lucide-react";
import { useMemo, useState } from "react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

export type LeiMunicipal = {
  num: string;
  desc: string;
  date: string;
  status: string;
};

export type LegislacaoPageConfig = {
  pageTitle: string;
  pageSubtitle: string;
  itemLabel: string;
  summaryLabel: string;
  activeSummaryLabel: string;
  extraSummaryLabel: string;
  extraSummaryTone?: string;
  searchAriaLabel: string;
  foundLabel: string;
  detailInfoTitle: string;
  detailTitlePrefix: string;
  relatedTitle: string;
  documentLabel: string;
};

export const LEIS_MUNICIPAIS_CONFIG: LegislacaoPageConfig = {
  pageTitle: "Leis Municipais",
  pageSubtitle: "Consulte leis, normas e atos municipais publicados pela Prefeitura Municipal de Roseira.",
  itemLabel: "Lei",
  summaryLabel: "Leis Municipais",
  activeSummaryLabel: "Publicações Ativas",
  extraSummaryLabel: "Consulta Pública",
  extraSummaryTone: "red",
  searchAriaLabel: "Filtrar leis municipais",
  foundLabel: "leis encontradas",
  detailInfoTitle: "Informações da Lei",
  detailTitlePrefix: "Lei Municipal Nº",
  relatedTitle: "Outras Leis",
  documentLabel: "Documento",
};

function statusClass(status: string) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

export default function LeisMunicipaisPage({
  leis,
  onBackHome,
  onSelectLei,
  config = LEIS_MUNICIPAIS_CONFIG,
}: {
  leis: LeiMunicipal[];
  onBackHome: () => void;
  onSelectLei: (index: number) => void;
  config?: LegislacaoPageConfig;
}) {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const summaryItems = [
    { label: config.summaryLabel, Icon: Scale, tone: "yellow" },
    { label: config.activeSummaryLabel, status: "Ativo", Icon: ScrollText, tone: "green" },
    { label: config.extraSummaryLabel, status: null, Icon: FileText, tone: config.extraSummaryTone ?? "red" },
  ];

  const years = useMemo(() => Array.from(new Set(leis.map((item) => item.date.slice(-4)))).sort((a, b) => b.localeCompare(a)), [leis]);
  const filteredItems = leis.filter((item) => {
    const matchesStatus = !activeStatus || item.status === activeStatus;
    const matchesYear = !year || item.date.endsWith(year);
    const searchText = `${item.num} ${item.desc} ${item.status}`.toLowerCase();
    return matchesStatus && matchesYear && searchText.includes(query.trim().toLowerCase());
  });

  return (
    <div className="concursos-view leis-view">
      <section className="site-internal-hero concursos-hero leis-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Legislação" },
            { label: config.pageTitle },
          ]} />

          <h1 className="site-title">{config.pageTitle}</h1>
          <p className="site-subtitle">{config.pageSubtitle}</p>

          <div className="concursos-summary-grid">
            {summaryItems.map(({ label, status, Icon, tone }) => {
              const total = status ? leis.filter((item) => item.status === status).length : leis.length;
              return (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-pressed={activeStatus === status}
                  className={`concursos-summary-card ${activeStatus === status ? "concursos-summary-card-active" : ""}`}
                  onClick={() => setActiveStatus((current) => current === status ? null : status)}
                >
                  <span className={`concursos-summary-icon concursos-summary-icon-${tone}`}>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="site-card-title">{label}</h2>
                    <p className="site-text">{total} disponíveis</p>
                  </div>
                  <strong className={`concursos-summary-total concursos-summary-total-${tone}`}>{total}</strong>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="concursos-results">
        <div className="max-w-7xl mx-auto px-4">
          <form className="concursos-filter" aria-label={config.searchAriaLabel}>
            <div className="concursos-filter-grid">
              <label>
                <span className="site-caps-title">Número / Descrição</span>
                <div className="concursos-input">
                  <Search aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar por número ou descrição..."
                  />
                </div>
              </label>
              <label>
                <span className="site-caps-title">Ano</span>
                <select value={year} onChange={(event) => setYear(event.target.value)}>
                  <option value="">Todos os anos</option>
                  {years.map((itemYear) => (
                    <option key={itemYear}>{itemYear}</option>
                  ))}
                </select>
              </label>
            </div>
          </form>

          <div className="licitacoes-heading">
            <h2 className="site-card-title">{filteredItems.length} {config.foundLabel}</h2>
            <p className="site-text">Acesse as publicações e informações principais.</p>
          </div>

          <div className="concursos-list">
            {filteredItems.map((item) => {
              const itemIndex = leis.indexOf(item);
              return (
              <button
                key={`${item.num}-${item.date}`}
                type="button"
                title={item.desc}
                onClick={() => onSelectLei(itemIndex)}
                className={[
                  "concursos-result-card",
                  "leis-result-card",
                  `concursos-status-card-${statusClass(item.status)}`,
                  "concursos-result-tag-ed",
                ].join(" ")}
              >
                <div className="concursos-result-content">
                  <div className="concursos-result-meta">
                    <span className="concursos-tag concursos-tag-ed">{config.itemLabel}</span>
                    <span>Nº {item.num}</span>
                    <span className={`concursos-status concursos-status-${statusClass(item.status)}`}>{item.status}</span>
                  </div>
                  <h3 className="site-card-title">{item.desc}</h3>
                  <p className="site-text">Publicação: {item.date}</p>
                </div>
                <div className="concursos-views licitacoes-action" aria-hidden="true">
                  <ChevronRight />
                </div>
              </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export function LeiMunicipalDetailPage({
  lei,
  leis,
  onBackHome,
  onBackList,
  onSelectLei,
  config = LEIS_MUNICIPAIS_CONFIG,
}: {
  lei: LeiMunicipal;
  leis: LeiMunicipal[];
  onBackHome: () => void;
  onBackList: () => void;
  onSelectLei: (index: number) => void;
  config?: LegislacaoPageConfig;
}) {
  const relatedItems = leis.filter((item) => item.num !== lei.num).slice(0, 4);

  return (
    <div className="concursos-view leis-view">
      <section className="site-internal-hero concursos-hero leis-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Legislação" },
            { label: config.pageTitle, onClick: onBackList },
            { label: `Nº ${lei.num}` },
          ]} />

          <span className={`concursos-status concursos-status-${statusClass(lei.status)}`}>{lei.status}</span>
          <h1 className="site-title">{config.detailTitlePrefix} {lei.num}</h1>
          <p className="site-subtitle">{lei.desc}</p>
        </div>
      </section>

      <section className="concursos-results">
        <div className="max-w-7xl mx-auto px-4">
          <div className="licitacao-detail-layout">
            <article className="licitacao-detail-panel">
              <h2 className="site-panel-title">{config.detailInfoTitle}</h2>
              <div className="licitacao-detail-grid">
                <div>
                  <span className="site-caps-title">Número</span>
                  <strong className="site-card-title">{lei.num}</strong>
                </div>
                <div>
                  <span className="site-caps-title">Status</span>
                  <strong className={`concursos-status concursos-status-${statusClass(lei.status)}`}>{lei.status}</strong>
                </div>
                <div>
                  <span className="site-caps-title">Publicação</span>
                  <strong className="site-card-title">{lei.date}</strong>
                </div>
              </div>
              <div className="licitacao-detail-object">
                <span className="site-caps-title">Descrição</span>
                <p className="site-text">{lei.desc}</p>
              </div>
              <div className="licitacao-detail-documents">
                <h2 className="site-panel-title">Documentos</h2>
                <a href="#" title={config.documentLabel} className="site-action-button button-yellow">
                  <FileText aria-hidden="true" />
                  {config.documentLabel}
                </a>
                <a href="#" title="Publicações" className="site-action-button-muted">
                  <CalendarDays aria-hidden="true" />
                  Publicações
                </a>
              </div>
            </article>

            <aside className="licitacao-detail-panel licitacao-related-panel">
              <h2 className="site-panel-title">{config.relatedTitle}</h2>
              <div className="licitacao-related-list">
                {relatedItems.map((item) => {
                  const itemIndex = leis.indexOf(item);
                  return (
                    <button key={`${item.num}-${item.date}`} type="button" title={`Nº ${item.num}`} className="licitacao-related-card" onClick={() => onSelectLei(itemIndex)}>
                      <span className={`concursos-status concursos-status-${statusClass(item.status)}`}>{item.status}</span>
                      <strong className="site-card-title">Nº {item.num}</strong>
                      <p className="site-text">{item.desc}</p>
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
