import { CalendarDays, ChevronRight, ClipboardCheck, Download, FileText, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import SearchYearFilter from "../components/SearchYearFilter";
import Pagination from "../components/Pagination";

export type Licitacao = {
  num: string;
  desc: string;
  date: string;
  status: string;
  modalidade?: string;
  value?: string;
  updatedAt?: string;
  documents?: Partial<Record<"edital" | "termoReferencia" | "pareceres" | "orcamento" | "ata" | "resultado", string>>;
};

const LICITACAO_TYPES = [
  { label: "Todos os processos", status: null, Icon: FileText, tone: "yellow" },
  { label: "Licitações em Aberto", status: "Ativo", Icon: ShieldCheck, tone: "green" },
  { label: "Licitações Encerradas", status: "Encerrado", Icon: ClipboardCheck, tone: "red" },
];

const CATEGORY_PLURALS: Record<string, string> = {
  licitacoes: "Licitações",
  "em-aberto": "Licitações",
  encerradas: "Licitações",
  "concorrencia-publica": "Concorrências",
  "chamada-publica": "Chamadas",
  "pregao-presencial": "Pregões",
  "tomada-de-precos": "Tomadas de preços",
  leilao: "Leilões",
  "dispensas-inexigibilidades": "Contratações diretas",
  contratos: "Contratos",
  aditivos: "Aditivos",
  "atas-registro-precos": "Atas de registro de preços",
  fornecedores: "Fornecedores",
  pncp: "Publicações PNCP",
};

export type LicitacoesPageConfig = {
  slug: string;
  title: string;
  subtitle: string;
  itemLabel?: string;
  detailTitle?: string;
  documentsUrl?: string;
  statusFilter?: string;
  categoryPlural?: string;
};

export const LICITACOES_PAGE_CONFIGS: Record<string, LicitacoesPageConfig> = {
  "licitacoes": { slug: "licitacoes", title: "Licitações", subtitle: "Consulte editais, processos, resultados e informações sobre compras públicas do Município de Roseira.", documentsUrl: "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/licitacoes" },
  "em-aberto": { slug: "em-aberto", title: "Licitações em Aberto", subtitle: "Consulte os processos licitatórios atualmente em andamento.", statusFilter: "Ativo", itemLabel: "Licitação" },
  "encerradas": { slug: "encerradas", title: "Licitações Encerradas", subtitle: "Consulte os processos licitatórios já encerrados e seus resultados.", statusFilter: "Encerrado", itemLabel: "Licitação" },
  "concorrencia-publica": { slug: "concorrencia-publica", title: "Concorrência Pública", subtitle: "Consulte processos, editais e resultados de concorrências públicas.", itemLabel: "Concorrência", categoryPlural: "Concorrências" },
  "chamada-publica": { slug: "chamada-publica", title: "Chamada Pública", subtitle: "Consulte chamadas públicas, documentos e resultados.", itemLabel: "Chamada" },
  "pregao-presencial": { slug: "pregao-presencial", title: "Pregão Presencial", subtitle: "Consulte processos e documentos de pregões presenciais.", itemLabel: "Pregão" },
  "tomada-de-precos": { slug: "tomada-de-precos", title: "Tomada de Preços", subtitle: "Consulte processos, editais e resultados de tomadas de preços.", itemLabel: "Tomada de preços" },
  "leilao": { slug: "leilao", title: "Leilão", subtitle: "Consulte editais, bens e resultados dos leilões municipais.", itemLabel: "Leilão" },
  "dispensas-inexigibilidades": { slug: "dispensas-inexigibilidades", title: "Dispensas e Inexigibilidades", subtitle: "Consulte processos de contratação direta e seus documentos.", itemLabel: "Contratação direta" },
  "contratos": { slug: "contratos", title: "Contratos de Licitações", subtitle: "Consulte contratos, fornecedores, valores, vigências e documentos.", itemLabel: "Contrato" },
  "aditivos": { slug: "aditivos", title: "Aditivos", subtitle: "Consulte os termos aditivos vinculados aos contratos municipais.", itemLabel: "Aditivo" },
  "atas-registro-precos": { slug: "atas-registro-precos", title: "Atas de Registro de Preços", subtitle: "Consulte atas, fornecedores, itens e vigências dos registros de preços.", itemLabel: "Ata" },
  "fornecedores": { slug: "fornecedores", title: "Fornecedores", subtitle: "Consulte fornecedores relacionados às contratações municipais.", itemLabel: "Fornecedor" },
  "pncp": { slug: "pncp", title: "PNCP", subtitle: "Consulte as publicações de licitações e contratos no Portal Nacional de Contratações Públicas.", itemLabel: "Publicação PNCP" },
};

function statusClass(status: string) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

export default function LicitacoesPage({
  licitacoes,
  onBackHome,
  onSelectLicitacao,
  config = LICITACOES_PAGE_CONFIGS.licitacoes,
}: {
  licitacoes: Licitacao[];
  onBackHome: () => void;
  onSelectLicitacao: (index: number) => void;
  config?: LicitacoesPageConfig;
}) {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const years = useMemo(() => Array.from(new Set(licitacoes.map((item) => item.date.slice(-4)))).sort((a, b) => b.localeCompare(a)), [licitacoes]);
  const scopedItems = config.statusFilter ? licitacoes.filter((item) => item.status === config.statusFilter) : licitacoes;
  const categoryPlural = config.categoryPlural ?? CATEGORY_PLURALS[config.slug] ?? "Licitações";
  const summaryItems = (config.statusFilter ? LICITACAO_TYPES.filter(({ status }) => status === config.statusFilter) : LICITACAO_TYPES).map((item) => ({
    ...item,
    label: item.status === "Ativo" ? `${categoryPlural} em Aberto` : item.status === "Encerrado" ? `${categoryPlural} Encerradas` : `Todas as ${categoryPlural.toLowerCase()}`,
  }));
  const filteredItems = scopedItems.filter((item) => {
    const matchesStatus = !activeStatus || item.status === activeStatus;
    const matchesYear = !year || item.date.endsWith(year);
    const searchText = `${item.num} ${item.desc} ${item.status}`.toLowerCase();
    return matchesStatus && matchesYear && searchText.includes(query.trim().toLowerCase());
  });
  const pageSize = 6;
  const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const exportCsv = () => {
    const headers = ["Numero", "Modalidade", "Objeto", "Publicacao", "Valor", "Status"];
    const rows = filteredItems.map((item) => [item.num, item.modalidade ?? "Nao informado", item.desc, item.date, item.value ?? "Nao informado", item.status]);
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(";")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `licitacoes-${config.slug}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="concursos-view licitacoes-view">
      <section className="site-internal-hero concursos-hero licitacoes-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Licitações" },
            { label: config.title },
          ]} />

          <h1 className="site-title">{config.title}</h1>
          <p className="site-subtitle">{config.subtitle}</p>

          <div className="concursos-summary-grid">
            {summaryItems.map(({ label, status, Icon, tone }) => {
              const total = status ? scopedItems.filter((item) => item.status === status).length : scopedItems.length;
              return (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-pressed={activeStatus === status}
                  className={`concursos-summary-card ${activeStatus === status ? "concursos-summary-card-active" : ""}`}
                  onClick={() => { setActiveStatus((current) => current === status ? null : status); setCurrentPage(1); }}
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
          <SearchYearFilter query={searchQuery} onQueryChange={setSearchQuery} year={searchYear} onYearChange={setSearchYear} years={years} ariaLabel={`Filtrar ${config.title.toLowerCase()}`} placeholder="Buscar por objeto, descrição ou nº do processo..." onSubmit={() => { setQuery(searchQuery); setYear(searchYear); setCurrentPage(1); }} />

          <div className="licitacoes-heading">
            <h2 className="site-card-title">{filteredItems.length} {config.itemLabel ?? "licitações"}{filteredItems.length === 1 ? " encontrada" : " encontradas"}</h2>
            <p className="site-text">Acesse os dados principais de cada processo.</p>
            <button type="button" className="site-action-button-muted licitacoes-export-button" onClick={exportCsv} title="Exportar resultados em CSV">
              <Download aria-hidden="true" /> Exportar resultados
            </button>
          </div>

          <div className="concursos-list">
            {paginatedItems.map((item) => {
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
                    <span className="concursos-tag concursos-tag-ed">{config.itemLabel ?? "LIC"}</span>
                    <span>Nº {item.num}</span>
                    <span className={`concursos-status concursos-status-${statusClass(item.status)}`}>{item.status}</span>
                  </div>
                  <h3 className="site-card-title">{item.desc}</h3>
          <p className="site-text">Publicação: {item.date} | Modalidade: {item.modalidade ?? "Não informado"} | Valor: {item.value ?? "Não informado"}</p>
                </div>
                <div className="concursos-views licitacoes-action" aria-hidden="true">
                  <ChevronRight />
                </div>
              </button>
              );
            })}
          </div>
          <Pagination currentPage={currentPage} totalItems={filteredItems.length} pageSize={pageSize} onPageChange={setCurrentPage} />
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
  config = LICITACOES_PAGE_CONFIGS.licitacoes,
}: {
  licitacao: Licitacao;
  licitacoes: Licitacao[];
  onBackHome: () => void;
  onBackList: () => void;
  onSelectLicitacao: (index: number) => void;
  config?: LicitacoesPageConfig;
}) {
  const relatedItems = licitacoes.filter((item) => item.num !== licitacao.num && item.status === "Ativo").slice(0, 4);

  return (
    <div className="concursos-view licitacoes-view">
      <section className="site-internal-hero concursos-hero licitacoes-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Licitações", onClick: onBackList },
            ...(config.slug === "licitacoes" ? [] : [{ label: config.title, onClick: onBackList }]),
            { label: `Nº ${licitacao.num}` },
          ]} />

          <span className={`concursos-status concursos-status-${statusClass(licitacao.status)}`}>{licitacao.status}</span>
          <h1 className="site-title">{config.detailTitle ?? "Licitação"} Nº {licitacao.num}</h1>
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
                <div>
                  <span className="site-caps-title">Modalidade</span>
                  <strong className="site-card-title">{licitacao.modalidade ?? "Não informado pelo ERP"}</strong>
                </div>
                <div>
                  <span className="site-caps-title">Valor</span>
                  <strong className="site-card-title">{licitacao.value ?? "Não informado pelo ERP"}</strong>
                </div>
                <div>
                  <span className="site-caps-title">Atualização</span>
                  <strong className="site-card-title">{licitacao.updatedAt ?? "Integração pendente"}</strong>
                </div>
              </div>
              <div className="licitacao-detail-object">
                <span className="site-caps-title">Objeto</span>
                <p className="site-text">{licitacao.desc}</p>
              </div>
              <div className="licitacao-detail-documents">
                <h2 className="site-panel-title">Documentos</h2>
                {([
                  ["edital", "Edital", FileText],
                  ["termoReferencia", "Termo de referência / projeto básico", FileText],
                  ["pareceres", "Pareceres e justificativas", FileText],
                  ["orcamento", "Orçamento estimado", FileText],
                  ["ata", "Ata e sessão pública", CalendarDays],
                  ["resultado", "Resultado, adjudicação e homologação", FileText],
                ] as const).map(([key, label, Icon]) => (
                  <a key={key} href={licitacao.documents?.[key] ?? config.documentsUrl ?? "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/licitacoes"} target="_blank" rel="noreferrer" title={label} className="site-action-button-muted">
                    <Icon aria-hidden="true" /> {label}
                  </a>
                ))}
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
