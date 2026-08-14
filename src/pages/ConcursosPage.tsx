import { useState } from "react";
import { ClipboardList, Home, Search, Trophy, UsersRound } from "lucide-react";

const CONCURSOS_PAGE_ITEMS = [
  { tag: "CP", type: "Concurso Público", num: "01/2023", status: "Em andamento", title: "Concurso Público para provimento de cargos efetivos do quadro de pessoal do Município", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 23/10/2023 até 30/11/2023", views: 48 },
  { tag: "CP", type: "Concurso Público", num: "01/2017", status: "Encerrado", title: "Concurso Público para cargos das áreas administrativa e operacional", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 19/11/2017 até 28/12/2017", views: 32 },
  { tag: "PSS", type: "Processo Seletivo", num: "01/2025", status: "Aberto", title: "Processo Seletivo Simplificado para contratação de pessoal por prazo determinado - Área da Saúde", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 02/03/2025 até 16/03/2025", views: 22 },
  { tag: "PSS", type: "Processo Seletivo", num: "01/2024", status: "Em andamento", title: "Processo Seletivo Simplificado - Educação e Assistência Social", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 01/11/2024 até 15/11/2024", views: 35 },
  { tag: "PSS", type: "Processo Seletivo", num: "01/2021", status: "Encerrado", title: "Processo Seletivo / Cadastro de Reserva - Diversas áreas", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 26/01/2021 até 10/02/2021", views: 60 },
  { tag: "ED", type: "Edital", num: "01/2019", status: "Encerrado", title: "Edital de Processo Seletivo para escolha de membros do Conselho Tutelar - CMDCA", org: "Prefeitura Municipal de Roseira", period: "Inscrições: 08/04/2019 até 30/04/2019", views: 5 },
  { tag: "ED", type: "Edital", num: "01/2018", status: "Encerrado", title: "Edital de convocação para atribuição de vagas remanescentes", org: "Prefeitura Municipal de Roseira", period: "Publicação: 14/08/2018", views: 12 },
];

export default function ConcursosPage({ onBackHome }: { onBackHome: () => void }) {
  const [activeType, setActiveType] = useState<string | null>(null);
  const summary = [
    { label: "Processo Seletivo", total: 3, available: "3 disponíveis", Icon: UsersRound, tone: "red", type: "Processo Seletivo" },
    { label: "Concurso Público", total: 2, available: "2 disponíveis", Icon: Trophy, tone: "green", type: "Concurso Público" },
    { label: "Edital", total: 2, available: "2 disponíveis", Icon: ClipboardList, tone: "yellow", type: "Edital" },
  ];
  const activeSummary = summary.find((item) => item.type === activeType);
  const filteredItems = activeType
    ? CONCURSOS_PAGE_ITEMS.filter((item) => item.type === activeType)
    : CONCURSOS_PAGE_ITEMS;

  return (
    <div className="concursos-view">
      <section className="concursos-hero">
        <div className="max-w-7xl mx-auto px-4">
          <div className="concursos-breadcrumb" aria-label="Caminho de navegação">
            <button type="button" onClick={onBackHome}>
              <Home aria-hidden="true" />
              Início
            </button>
            <span aria-hidden="true">›</span>
            <strong>Concursos e Seleções</strong>
          </div>

          <h1>Concursos e Seleções Públicas</h1>
          <p>
            Acompanhe todos os processos seletivos, concursos públicos e editais da Prefeitura Municipal de Roseira.
          </p>

          <div className="concursos-summary-grid">
            {summary.map(({ label, total, available, Icon, tone, type }) => (
              <button
                key={label}
                type="button"
                aria-pressed={activeType === type}
                className={`concursos-summary-card ${activeType === type ? "concursos-summary-card-active" : ""}`}
                onClick={() => setActiveType((current) => current === type ? null : type)}
              >
                <span className={`concursos-summary-icon concursos-summary-icon-${tone}`}>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h2>{label}</h2>
                  <p>{available}</p>
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
                <span>Objeto / Descrição / Nº do Processo</span>
                <div className="concursos-input">
                  <Search aria-hidden="true" />
                  <input type="search" placeholder="Buscar por objeto, descrição ou nº do processo..." />
                </div>
              </label>
              <label>
                <span>Ano</span>
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
          <h2>{filteredItems.length} publicações encontradas</h2>
          <div className="concursos-list">
            {filteredItems.map((item) => (
              <a
                key={`${item.tag}-${item.num}`}
                href="#"
                className={[
                  "concursos-result-card",
                  `concursos-status-card-${item.status.toLowerCase().replace(" ", "-")}`,
                  activeSummary ? `concursos-result-tone-${activeSummary.tone}` : "",
                ].filter(Boolean).join(" ")}
              >
                <div className="concursos-result-content">
                  <div className="concursos-result-meta">
                    <span className={`concursos-tag concursos-tag-${item.tag.toLowerCase()}`}>{item.tag}</span>
                    <span>Nº {item.num}</span>
                    <span className={`concursos-status concursos-status-${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.org} - {item.period}</p>
                </div>
                <div className="concursos-views">
                  <strong>{item.views}</strong>
                  <span>visitas</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
