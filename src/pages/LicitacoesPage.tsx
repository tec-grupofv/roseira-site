import { CalendarDays, ChevronRight, ClipboardCheck, FileText, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

export type Licitacao = {
  num: string;
  desc: string;
  date: string;
  status: string;
};

const LICITACAO_TYPES = [
  { label: "Todos os processos", status: null, Icon: FileText, tone: "yellow" },
  { label: "Licitações em Aberto", status: "Ativo", Icon: ShieldCheck, tone: "green" },
  { label: "Licitações Encerradas", status: "Encerrado", Icon: ClipboardCheck, tone: "red" },
];

function statusClass(status: string) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

export default function LicitacoesPage({
  licitacoes,
  onBackHome,
  onSelectLicitacao,
}: {
  licitacoes: Licitacao[];
  onBackHome: () => void;
  onSelectLicitacao: (index: number) => void;
}) {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");

  const years = useMemo(() => Array.from(new Set(licitacoes.map((item) => item.date.slice(-4)))).sort((a, b) => b.localeCompare(a)), [licitacoes]);
  const filteredItems = licitacoes.filter((item) => {
    const matchesStatus = !activeStatus || item.status === activeStatus;
    const matchesYear = !year || item.date.endsWith(year);
    const searchText = `${item.num} ${item.desc} ${item.status}`.toLowerCase();
    return matchesStatus && matchesYear && searchText.includes(query.trim().toLowerCase());
  });

  return (
    <div className="concursos-view licitacoes-view">
      <section className="site-internal-hero concursos-hero licitacoes-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Licitações" },
          ]} />

          <h1 className="site-title">Licitações</h1>
          <p className="site-subtitle">
            Consulte editais, processos, resultados e informações sobre compras públicas do Município de Roseira.
          </p>

          <div className="concursos-summary-grid">
            {LICITACAO_TYPES.map(({ label, status, Icon, tone }) => {
              const total = status ? licitacoes.filter((item) => item.status === status).length : licitacoes.length;
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
          <form className="concursos-filter" aria-label="Filtrar licitações">
            <div className="concursos-filter-grid">
              <label>
                <span className="site-caps-title">Objeto / Descrição / Nº do Processo</span>
                <div className="concursos-input">
                  <Search aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar por objeto, descrição ou nº do processo..."
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
            <h2 className="site-card-title">{filteredItems.length} licitações encontradas</h2>
            <p className="site-text">Acesse os dados principais de cada processo.</p>
          </div>

          <div className="concursos-list">
            {filteredItems.map((item) => {
              const itemIndex = licitacoes.indexOf(item);
              return (
              <button
                key={`${item.num}-${item.date}`}
                type="button"
                title={item.desc}
                onClick={() => onSelectLicitacao(itemIndex)}
                className={[
                  "concursos-result-card",
                  "licitacoes-result-card",
                  `concursos-status-card-${statusClass(item.status)}`,
                  "concursos-result-tag-ed",
                ].join(" ")}
              >
                <div className="concursos-result-content">
                  <div className="concursos-result-meta">
                    <span className="concursos-tag concursos-tag-ed">LIC</span>
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

export function LicitacaoDetailPage({
  licitacao,
  licitacoes,
  onBackHome,
  onBackList,
  onSelectLicitacao,
}: {
  licitacao: Licitacao;
  licitacoes: Licitacao[];
  onBackHome: () => void;
  onBackList: () => void;
  onSelectLicitacao: (index: number) => void;
}) {
  const relatedItems = licitacoes.filter((item) => item.num !== licitacao.num && item.status === "Ativo").slice(0, 4);

  return (
    <div className="concursos-view licitacoes-view">
      <section className="site-internal-hero concursos-hero licitacoes-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Licitações", onClick: onBackList },
            { label: `Nº ${licitacao.num}` },
          ]} />

          <span className={`concursos-status concursos-status-${statusClass(licitacao.status)}`}>{licitacao.status}</span>
          <h1 className="site-title">Licitação Nº {licitacao.num}</h1>
          <p className="site-subtitle">{licitacao.desc}</p>
        </div>
      </section>

      <section className="concursos-results">
        <div className="max-w-7xl mx-auto px-4">
          <div className="licitacao-detail-layout">
            <article className="licitacao-detail-panel">
              <h2 className="site-panel-title">Informações do Processo</h2>
              <div className="licitacao-detail-grid">
                <div>
                  <span className="site-caps-title">Número</span>
                  <strong className="site-card-title">{licitacao.num}</strong>
                </div>
                <div>
                  <span className="site-caps-title">Status</span>
                  <strong className={`concursos-status concursos-status-${statusClass(licitacao.status)}`}>{licitacao.status}</strong>
                </div>
                <div>
                  <span className="site-caps-title">Publicação</span>
                  <strong className="site-card-title">{licitacao.date}</strong>
                </div>
              </div>
              <div className="licitacao-detail-object">
                <span className="site-caps-title">Objeto</span>
                <p className="site-text">{licitacao.desc}</p>
              </div>
              <div className="licitacao-detail-documents">
                <h2 className="site-panel-title">Documentos</h2>
                <a href="#" title="Edital" className="site-action-button button-yellow">
                  <FileText aria-hidden="true" />
                  Edital
                </a>
                <a href="#" title="Publicações" className="site-action-button-muted">
                  <CalendarDays aria-hidden="true" />
                  Publicações
                </a>
              </div>
            </article>

            <aside className="licitacao-detail-panel licitacao-related-panel">
              <h2 className="site-panel-title">Outras Licitações</h2>
              <div className="licitacao-related-list">
                {relatedItems.map((item) => {
                  const itemIndex = licitacoes.indexOf(item);
                  return (
                    <button key={`${item.num}-${item.date}`} type="button" title={`Nº ${item.num}`} className="licitacao-related-card" onClick={() => onSelectLicitacao(itemIndex)}>
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
