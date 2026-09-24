import { useState } from "react";
import { ClipboardList, ChevronRight, FileText, Search, Trophy, UsersRound } from "lucide-react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

export const CONCURSOS_PAGE_ITEMS = [
  { tag: "CP", type: "Concurso Público", num: "01/2023", status: "Em andamento", title: "Concurso Público para provimento de cargos efetivos do quadro de pessoal do Município", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 23/10/2023 até 30/11/2023", views: 48, acolhimento: "23/10/2023", abertura: "01/12/2023", disputa: "10/12/2023", objeto: "Provimento de cargos efetivos do quadro de pessoal municipal", resumo: "Processo destinado ao preenchimento de cargos efetivos, conforme edital e cronograma oficial.", arquivos: ["Edital de abertura", "Cronograma", "Resultado"] },
  { tag: "CP", type: "Concurso Público", num: "01/2017", status: "Encerrado", title: "Concurso Público para cargos das áreas administrativa e operacional", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 19/11/2017 até 28/12/2017", views: 32 },
  { tag: "PSS", type: "Processo Seletivo", num: "01/2025", status: "Aberto", title: "Processo Seletivo Simplificado para contratação de pessoal por prazo determinado - Área da Saúde", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 02/03/2025 até 16/03/2025", views: 22 },
  { tag: "PSS", type: "Processo Seletivo", num: "01/2024", status: "Em andamento", title: "Processo Seletivo Simplificado - Educação e Assistência Social", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 01/11/2024 até 15/11/2024", views: 35 },
  { tag: "PSS", type: "Processo Seletivo", num: "01/2021", status: "Encerrado", title: "Processo Seletivo / Cadastro de Reserva - Diversas áreas", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 26/01/2021 até 10/02/2021", views: 60 },
  { tag: "ED", type: "Edital", num: "01/2019", status: "Encerrado", title: "Edital de Processo Seletivo para escolha de membros do Conselho Tutelar - CMDCA", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 08/04/2019 até 30/04/2019", views: 5 },
  { tag: "ED", type: "Edital", num: "01/2018", status: "Encerrado", title: "Edital de convocação para atribuição de vagas remanescentes", org: "Prefeitura Municipal de Roseira", period: "Publicação: 14/08/2018", views: 12 },
];

export default function ConcursosPage({ onBackHome, onSelectConcurso }: { onBackHome: () => void; onSelectConcurso: (index: number) => void }) {
  const [activeType, setActiveType] = useState<string | null>(null);
  const summary = [
    { label: "Todos os processos", total: CONCURSOS_PAGE_ITEMS.length, available: `${CONCURSOS_PAGE_ITEMS.length} disponíveis`, Icon: FileText, tone: "yellow", type: null },
    { label: "Processo Seletivo", total: 3, available: "3 disponíveis", Icon: UsersRound, tone: "pss", type: "Processo Seletivo" },
    { label: "Concurso Público", total: 2, available: "2 disponíveis", Icon: Trophy, tone: "cp", type: "Concurso Público" },
    { label: "Edital", total: 2, available: "2 disponíveis", Icon: ClipboardList, tone: "red", type: "Edital" },
  ];
  const filteredItems = activeType
    ? CONCURSOS_PAGE_ITEMS.filter((item) => item.type === activeType)
    : CONCURSOS_PAGE_ITEMS;

  return (
    <div className="concursos-view">
      <section className="site-internal-hero concursos-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Concursos e Seleções" },
          ]} />

          <h1 className="site-title">Concursos e Seleções Públicas</h1>
          <p className="site-subtitle">
            Acompanhe todos os processos seletivos, concursos públicos e editais da Prefeitura Municipal de Roseira.
          </p>

          <div className="concursos-summary-grid">
            {summary.map(({ label, total, available, Icon, tone, type }) => (
              <button
                key={label}
                type="button"
                title={label}
                aria-pressed={activeType === type}
                className={`concursos-summary-card ${activeType === type ? "concursos-summary-card-active" : ""}`}
                onClick={() => setActiveType((current) => current === type ? null : type)}
              >
                <span className={`concursos-summary-icon concursos-summary-icon-${tone}`}>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h2 className="site-card-title">{label}</h2>
                  <p className="site-text">{available}</p>
                </div>
                <strong className={`concursos-summary-total concursos-summary-total-${tone}`}>{total}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="concursos-results">
        <div className="max-w-7xl mx-auto px-4">
          <form className="concursos-filter" aria-label="Filtrar publicações">
            <div className="concursos-filter-grid">
              <label>
                <span className="site-caps-title">Objeto / Descrição / Nº do Processo</span>
                <div className="concursos-input">
                  <Search aria-hidden="true" />
                  <input type="search" placeholder="Buscar por objeto, descrição ou nº do processo..." />
                </div>
              </label>
              <label>
                <span className="site-caps-title">Ano</span>
                <select defaultValue="">
                  <option value="">Todos os anos</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2021</option>
                  <option>2019</option>
                  <option>2017</option>
                </select>
              </label>
            </div>
          </form>
          <h2 className="site-card-title">{filteredItems.length} publicações encontradas</h2>
          <div className="concursos-list">
            {filteredItems.map((item) => (
              <button
                key={`${item.tag}-${item.num}`}
                type="button"
                title={item.title}
                onClick={() => onSelectConcurso(CONCURSOS_PAGE_ITEMS.indexOf(item))}
                className={[
                  "concursos-result-card",
                  `concursos-status-card-${item.status.toLowerCase().replace(" ", "-")}`,
                  `concursos-result-tag-${item.tag.toLowerCase()}`,
                ].filter(Boolean).join(" ")}
              >
                <div className="concursos-result-content">
                  <div className="concursos-result-meta">
                    <span className={`concursos-tag concursos-tag-${item.tag.toLowerCase()}`}>{item.tag}</span>
                    <span>Nº {item.num}</span>
                    <span className={`concursos-status concursos-status-${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span>
                  </div>
                  <h3 className="site-card-title">{item.title}</h3>
                  <p className="site-text">{item.org} - {item.period}</p>
                </div>
                <div className="concursos-views">
                  <strong>{item.views}</strong>
                  <span>visitas</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ConcursoDetailPage({ item, onBackHome, onBackList, onSelectConcurso }: { item: (typeof CONCURSOS_PAGE_ITEMS)[number]; onBackHome: () => void; onBackList: () => void; onSelectConcurso: (index: number) => void }) {
  const relatedItems = CONCURSOS_PAGE_ITEMS.filter((candidate) => candidate.num !== item.num).slice(0, 4);
  return (
    <div className="concursos-view concurso-detail-view">
      <section className="site-internal-hero concursos-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[{ label: "Início", onClick: onBackHome }, { label: "Concursos e Seleções", onClick: onBackList }, { label: `Nº ${item.num}` }]} />
          <span className="concursos-status concursos-status-em-andamento">{item.status}</span>
          <h1 className="site-title">{item.type} Nº {item.num}</h1>
          <p className="site-subtitle">{item.title}</p>
        </div>
      </section>
      <section className="concursos-results">
        <div className="max-w-7xl mx-auto px-4">
          <div className="licitacao-detail-layout">
            <article className="licitacao-detail-panel">
              <h2 className="site-panel-title">Informações do concurso</h2>
              <div className="licitacao-detail-grid concurso-detail-dates">
                <div><span className="site-caps-title">Data de acolhimento</span><strong className="site-card-title">{item.acolhimento ?? "Não informado"}</strong></div>
                <div><span className="site-caps-title">Data de abertura</span><strong className="site-card-title">{item.abertura ?? "Não informado"}</strong></div>
                <div><span className="site-caps-title">Data de disputa</span><strong className="site-card-title">{item.disputa ?? "Não informado"}</strong></div>
              </div>
              <div className="licitacao-detail-object concurso-detail-object"><span className="site-caps-title">Objeto</span><p className="site-text">{item.objeto ?? item.title}</p></div>
              <div className="licitacao-detail-object concurso-detail-object"><span className="site-caps-title">Resumo</span><p className="site-text">{item.resumo ?? item.title}</p></div>
              <div className="licitacao-detail-documents"><h2 className="site-panel-title">Arquivos</h2>{(item.arquivos ?? []).map((arquivo) => <button type="button" className="site-action-button button-yellow" key={arquivo}><FileText aria-hidden="true" />{arquivo}</button>)}</div>
            </article>
            <aside className="licitacao-detail-panel licitacao-related-panel">
              <h2 className="site-panel-title">Outros Concursos</h2>
              <div className="licitacao-related-list">
                {relatedItems.map((related) => <button key={related.num} type="button" className="licitacao-related-card" onClick={() => onSelectConcurso(CONCURSOS_PAGE_ITEMS.indexOf(related))}><span className={`concursos-status concursos-status-${related.status.toLowerCase().replace(" ", "-")}`}>{related.status}</span><strong className="site-card-title">Nº {related.num}</strong><p className="site-text">{related.title}</p></button>)}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
