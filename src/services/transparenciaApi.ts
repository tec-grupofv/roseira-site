const API_BASE = "https://pmroseira.geosiap.net.br:8443/portal-transparencia/api";

export type PortalContact = {
  referencial?: string | null;
  descricao?: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  horario?: string;
};

export type PortalLicitacao = {
  id_processo_compra?: string;
  nr_processo_compra?: string;
  nr_modalidade?: string;
  nr_edital?: string;
  objeto?: string;
  dt_abertura?: string | null;
  dt_homologacao?: string | null;
  ds_st_processo_compra?: string;
};

export type PortalContrato = Record<string, unknown> & {
  id_contrato?: string;
  nr_contrato?: string;
  fornecedor?: string;
  credor?: string;
  objeto?: string;
  valor?: string | number;
  dt_inicio?: string;
  dt_fim?: string;
  fiscal?: string;
};

export type PortalMenuItem = {
  id?: string;
  name: string;
  route?: string | null;
  items?: PortalMenuItem[];
};

export type PortalSnapshot = {
  entidadeId: string;
  contatos: PortalContact[];
  licitacoes: PortalLicitacao[];
  contratos: PortalContrato[];
  menu: PortalMenuItem[];
  organograma: unknown[];
  servidores: unknown[];
};

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Portal da Transparência: HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

function cleanRows<T>(value: T): T {
  if (Array.isArray(value)) return value.map((item) => cleanRows(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cleanRows(item)])) as T;
  }
  return typeof value === "string" ? value.trim() as T : value;
}

export async function loadPortalSnapshot(): Promise<PortalSnapshot> {
  const entidades = await getJson<Array<{ id_entidade: string; principal?: string }>>("/sis_entidade");
  const entidadeId = entidades.find((item) => item.principal === "1")?.id_entidade ?? entidades[0]?.id_entidade ?? "2";
  const [contactResponse, menu, licitacaoResponse, contratoResponse, organogramaResponse, servidorResponse] = await Promise.allSettled([
    getJson<{ contatos?: PortalContact[] }>("/contatos/contatos"),
    getJson<unknown[]>(`/portal/menu_itens?tipo_consulta=menu&tipo_entidade=${entidadeId}`),
    getJson<{ licitacoes?: PortalLicitacao[] }>(`/licitacoes/licitacoes/index?id_entidade=${entidadeId}`),
    getJson<{ contratos?: PortalContrato[] }>(`/licitacoes/contratos/contratos?id_entidade=${entidadeId}&data_inicial=2020-01-01&data_final=${new Date().toISOString().slice(0, 10)}`),
    getJson<unknown[]>(`/rh/servidores/organograma?id_entidade=${entidadeId}`),
    getJson<unknown[]>(`/rh/servidores/servidores_ativos?id_entidade=${entidadeId}&competencia=${new Date().toISOString().slice(0, 10)}`),
  ]);
  const value = <T,>(result: PromiseSettledResult<T>, fallback: T) => result.status === "fulfilled" ? result.value : fallback;
  return {
    entidadeId,
    contatos: cleanRows(value(contactResponse, { contatos: [] }).contatos ?? []),
    menu: cleanRows(value(menu, []) as PortalMenuItem[]),
    licitacoes: cleanRows(value(licitacaoResponse, { licitacoes: [] }).licitacoes ?? []),
    contratos: cleanRows(value(contratoResponse, { contratos: [] }).contratos ?? []),
    organograma: cleanRows(value(organogramaResponse, [])),
    servidores: cleanRows(value(servidorResponse, [])),
  };
}

export { API_BASE };
