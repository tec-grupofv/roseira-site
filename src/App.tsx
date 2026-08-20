import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FileText, Info, Landmark, Newspaper, ShieldCheck, UsersRound } from "lucide-react";
import ConcursosPage from "./pages/ConcursosPage";
import LicitacoesPage, { LicitacaoDetailPage } from "./pages/LicitacoesPage";
import LeisMunicipaisPage, { LeiMunicipalDetailPage, type LegislacaoPageConfig } from "./pages/LeisMunicipaisPage";
import NoticiasPage, { NoticiaDetailPage } from "./pages/NoticiasPage";
import SecretariaDetailPage, { SecretariasDirectoryPage } from "./pages/SecretariaDetailPage";
import HistoriaRoseiraPage from "./pages/HistoriaRoseiraPage";
import ContatoPage from "./pages/ContatoPage";
import SiteBreadcrumb from "./components/SiteBreadcrumb";

type RequirementPageKind = "table" | "documents" | "service" | "external" | "statement";

type RequirementPageConfig = {
  title: string;
  subtitle: string;
  category: string;
  kind: RequirementPageKind;
  sourceLabel?: string;
  sourceUrl?: string;
  requiredElements: string[];
  columns: string[];
  rows: string[][];
};

// -----------------------------------------------------------------------------
// ICONS
// -----------------------------------------------------------------------------
const I = {
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
  ),
  menu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
  close: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  chevRight: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>,
  chevDown: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m6 9 6 6 6-6"/></svg>,
  chevLeft: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>,
  ext: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  fb: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  ig: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
  yt: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12s0-3.2-.41-4.74a2.9 2.9 0 0 0-2.05-2.05C18 4.8 12 4.8 12 4.8s-6 0-7.54.41a2.9 2.9 0 0 0-2.05 2.05C2 8.8 2 12 2 12s0 3.2.41 4.74a2.9 2.9 0 0 0 2.05 2.05C6 19.2 12 19.2 12 19.2s6 0 7.54-.41a2.9 2.9 0 0 0 2.05-2.05C22 15.2 22 12 22 12Z"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/></svg>,
  msg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.36 2 2 6.13 2 11.2c0 2.9 1.35 5.5 3.47 7.25v3.55l3.24-1.79c.87.24 1.79.37 2.76.37 5.65 0 10.2-4.13 10.2-9.2C21.67 6.13 17.65 2 12 2z"/></svg>,
  map: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6A16 16 0 0 0 15.4 16.09l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  photo: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  video: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></svg>,
  calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  sun: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>,
  cookie: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01"/></svg>,
  qr: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M7 21v-3a2 2 0 0 1 2-2h3M21 12v.01M12 21v-1"/></svg>,
  accessible: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-5.87.94"/><path d="M5 8l3-3 5 1 3 3-3 1"/><path d="M9 12l-1 7 7-2"/></svg>,
};

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------
const NAV_ITEMS = [
  {
    label: "A Prefeitura",
    children: ["História de Roseira", "Prefeito e Vice-prefeito", "Gabinete", "Estrutura Administrativa", "Telefones e Endereços", "Horário de Atendimento", "Símbolos Municipais", "Conselhos Municipais", "Mapa do Site", "Galeria de Fotos", "Termos de Uso", "Política de Cookies", "LGPD"],
  },
  {
    label: "Secretarias",
    children: ["Administração", "Assistência Social", "Educação", "Saúde", "Obras e Serviços Municipais", "Agricultura e Meio Ambiente", "Cultura, Esporte e Turismo", "Fazenda / Finanças", "Planejamento", "Procuradoria / Jurídico"],
  },
  {
    label: "Serviços",
    children: ["Carta de Serviços", "Serviços ao Cidadão", "Serviços à Empresa", "Serviços ao Servidor", "Protocolos", "Emissão de Guias", "IPTU", "Dívida Ativa", "ITBI", "Nota Fiscal Eletrônica", "Cadastro de Inscrição Municipal", "Bolsa Família", "Banco do Povo", "Acessa SP", "Conselho Tutelar", "Junta Militar", "COVID-19", "Portal da Educação", "Conselho Municipal de Educação", "Conselho de Alimentação Escolar", "Vagas em Creche", "Educação - Página Temática", "Saúde - Página Temática", "Esporte - Página Temática", "Turismo e Cultura", "Meio Ambiente", "Plano Municipal de Arborização Urbana", "Centro de Esterilização de Animais", "Lei Aldir Blanc 2", "Vagas de Emprego", "Agendamento", "Perguntas Frequentes"],
  },
  {
    label: "Notícias",
    children: ["Últimas Notícias", "Comunicados", "Agenda de Eventos", "Campanhas", "Boletins Oficiais"],
  },
  {
    label: "Licitações",
    children: ["Licitações em Aberto", "Licitações Encerradas", "Concorrência Pública", "Chamada Pública", "Pregão Presencial", "Tomada de Preços", "Leilão", "Dispensas e Inexigibilidades", "Contratos", "Aditivos", "Atas de Registro de Preços", "Fornecedores", "PNCP"],
  },
  { label: "Concursos", children: [] },
  {
    label: "Transparência",
    children: ["Portal da Transparência", "Receitas", "Despesas", "Folha de Pagamento", "Diárias e Passagens", "Contratos", "Convênios e Repasses", "Obras Públicas", "Audiências Públicas", "PPA, LDO e LOA", "RREO e RGF", "Prestação de Contas", "Parecer do Tribunal de Contas", "Dados Abertos", "Radar da Transparência / Matriz Atricon"],
  },
  {
    label: "Legislação",
    children: ["Leis Municipais", "Decretos", "Portarias", "Código Tributário", "Plano Diretor", "Lei Orgânica Municipal", "Diário Oficial", "Atos Oficiais"],
  },
  {
    label: "Contato",
    children: ["Fale Conosco", "Ouvidoria", "e-SIC", "Endereço e Telefones", "Horários de Atendimento", "Mapa de Localização", "Redes Sociais"],
  },
];

const EXTERNAL_LINKS = {
  transparencia: "https://pmroseira.geosiap.net.br:8443/portal-transparencia/home",
  iptu: "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/arrecadacao/2via/index.php",
  iss: "https://pmroseira.geosiap.net.br:8443/pmroseira/issonline/iss.login.php",
  nfse: "https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional",
  rh: "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/recursos_humanos/grh/grh_rh_online.php",
  holerite: "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/recursos_humanos/fol/veracidade_holerith.php",
};

const REQUIREMENT_PAGES: Record<string, RequirementPageConfig> = {
  "prefeito-vice": {
    title: "Prefeito e Vice-prefeito",
    subtitle: "Espaco para identificação dos chefes do Poder Executivo, agenda, biografia institucional e canais oficiais.",
    category: "Institucional",
    kind: "documents",
    sourceLabel: "Prefeitura",
    sourceUrl: "https://www.roseira.sp.gov.br/prefeitura",
    requiredElements: ["Nome e cargo", "Mandato", "Contato institucional", "Agenda ou registro de compromissos"],
    columns: ["Cargo", "Responsável", "Mandato", "Contato"],
    rows: [["Prefeito", "Não declarado", "Não declarado", "Não declarado"], ["Vice-prefeito", "Não declarado", "Não declarado", "Não declarado"]],
  },
  gabinete: {
    title: "Gabinete",
    subtitle: "Página de referência para competencias, equipe responsável, atendimento e documentos do gabinete.",
    category: "Institucional",
    kind: "documents",
    requiredElements: ["Competências", "Responsável", "Horário de atendimento", "Documentos relacionados"],
    columns: ["Setor", "Responsável", "Telefone", "E-mail"],
    rows: [["Gabinete do Prefeito", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "estrutura-administrativa": {
    title: "Estrutura Administrativa",
    subtitle: "Organograma, secretarias, competências e responsáveis da administração municipal.",
    category: "Institucional",
    kind: "table",
    sourceLabel: "Departamentos/Secretarias",
    sourceUrl: "https://www.roseira.sp.gov.br/prefeitura/departamento",
    requiredElements: ["Organograma", "Competências", "Responsáveis", "Endereços e contatos"],
    columns: ["Unidade", "Competência", "Responsável", "Contato"],
    rows: [["Secretaria Municipal", "Descrição da atribuição", "Não declarado", "Não declarado"], ["Departamento", "Descrição da atribuição", "Não declarado", "Não declarado"]],
  },
  "telefones-enderecos": {
    title: "Telefones e Endereços",
    subtitle: "Lista estruturada dos setores, telefones, e-mails, enderecos e horarios de atendimento.",
    category: "Atendimento",
    kind: "table",
    sourceLabel: "Telefones uteis",
    sourceUrl: "https://www.roseira.sp.gov.br/prefeitura/telefones",
    requiredElements: ["Setor", "Endereço", "Telefone", "E-mail", "Horário"],
    columns: ["Setor", "Endereço", "Telefone", "E-mail", "Horário"],
    rows: [["Prefeitura", "Não declarado", "Não declarado", "Não declarado", "Não declarado"], ["Secretaria", "Não declarado", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "horario-atendimento": {
    title: "Horário de Atendimento",
    subtitle: "Quadro de funcionamento dos orgaos municipais e excecoes de atendimento.",
    category: "Atendimento",
    kind: "table",
    requiredElements: ["Unidade", "Dias de funcionamento", "Horário", "Observações"],
    columns: ["Unidade", "Dias", "Horário", "Observação"],
    rows: [["Prefeitura Municipal", "Segunda a sexta-feira", "Não declarado", "Atendimento geral"], ["Setores externos", "Não declarado", "Não declarado", "Conferir unidade"]],
  },
  "símbolos-municipais": {
    title: "Símbolos Municipais",
    subtitle: "Página para brasão, bandeira, hino e demais símbolos oficiais do Município.",
    category: "Cidade",
    kind: "documents",
    sourceLabel: "Hino do Município",
    sourceUrl: "https://www.roseira.sp.gov.br/cidade/hino",
    requiredElements: ["Brasão", "Bandeira", "Hino", "Norma de instituição"],
    columns: ["Símbolo", "Descrição", "Arquivo", "Norma"],
    rows: [["Brasão", "Não declarado", "Não declarado", "Não declarado"], ["Hino", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "conselhos-municipais": {
    title: "Conselhos Municipais",
    subtitle: "Relação de conselhos, composição, mandato, atas, reuniões e documentos públicados.",
    category: "Participação Social",
    kind: "table",
    requiredElements: ["Nome do conselho", "Composição", "Atas", "Calendário de reuniões"],
    columns: ["Conselho", "Mandato", "Composição", "Atas"],
    rows: [["Conselho Municipal", "Não declarado", "Não declarado", "Não declarado"], ["Conselho setorial", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "carta-servicos": {
    title: "Carta de Serviços",
    subtitle: "Catálogo de serviços públicos com público-alvo, documentos, prazo, etapas e canal de atendimento.",
    category: "Serviços",
    kind: "service",
    sourceLabel: "Carta de Serviços antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/carta-servico/categoria",
    requiredElements: ["Serviço", "Público-alvo", "Documentos", "Prazo", "Canal digital ou presencial"],
    columns: ["Serviço", "Público-alvo", "Documentos", "Prazo", "Canal"],
    rows: [["Solicitação de serviço", "Cidadão", "Não declarado", "Não declarado", "Não declarado"], ["Emissão de guia", "Cidadão/empresa", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "servicos-cidadao": {
    title: "Serviços ao Cidadão",
    subtitle: "Área para reunir IPTU, Bolsa Familia, Junta Militar, Conselho Tutelar, Educação e demais acessos.",
    category: "Serviços",
    kind: "service",
    requiredElements: ["Serviço", "Descrição", "Link de acesso", "Unidade responsável"],
    columns: ["Serviço", "Descrição", "Link", "Responsável"],
    rows: [["2a via IPTU / Taxas Imobiliarias", "Acesso externo", EXTERNAL_LINKS.iptu, "Finanças"], ["Bolsa Familia", "Atendimento social", "Não declarado", "Assistência Social"]],
  },
  "servicos-empresa": {
    title: "Serviços a Empresa",
    subtitle: "Acessos para inscrição municipal, ISS Online, NFS-e, licitacoes e canais empresariais.",
    category: "Serviços",
    kind: "service",
    requiredElements: ["Serviço", "Obrigação atendida", "Link", "Orientações"],
    columns: ["Serviço", "Finalidade", "Link", "Responsável"],
    rows: [["ISS Online", "Serviços fiscais", EXTERNAL_LINKS.iss, "Finanças"], ["NFS-e", "Emissão de nota fiscal", EXTERNAL_LINKS.nfse, "Finanças"]],
  },
  "servicos-servidor": {
    title: "Serviços ao Servidor",
    subtitle: "Área para RH Online, holerite, comprovantes, informativos funcionais e canais internos.",
    category: "Servidor",
    kind: "service",
    requiredElements: ["RH Online", "Veracidade de holerite", "Informativos", "Canais de suporte"],
    columns: ["Serviço", "Descrição", "Link", "Status"],
    rows: [["RH Online", "Acesso externo", EXTERNAL_LINKS.rh, "Disponível"], ["Veracidade do Holerite", "Validação externa", EXTERNAL_LINKS.holerite, "Disponível"]],
  },
  protocolos: {
    title: "Protocolos",
    subtitle: "Página para abertura, consulta e acompanhamento de protocolos administrativos.",
    category: "Serviços",
    kind: "table",
    requiredElements: ["Número do protocolo", "Assunto", "Data", "Situação"],
    columns: ["Protocolo", "Assunto", "Data", "Situação"],
    rows: [["0000/2026", "Solicitação demonstrativa", "Não declarado", "Em análise"], ["0001/2026", "Requerimento demonstrativo", "Não declarado", "Recebido"]],
  },
  "emissão-guias": {
    title: "Emissão de Guias",
    subtitle: "Central para guias tributárias, taxas, DAM e demais documentos de arrecadação.",
    category: "Serviços",
    kind: "service",
    requiredElements: ["Tipo de guia", "Descrição", "Link", "Unidade responsável"],
    columns: ["Guia", "Descrição", "Link", "Responsável"],
    rows: [["IPTU / Taxas Imobiliarias", "Acesso externo", EXTERNAL_LINKS.iptu, "Finanças"], ["Outras guias", "Não declarado", "Não declarado", "Finanças"]],
  },
  iptu: {
    title: "IPTU",
    subtitle: "Acesso a 2a via, taxas imobiliarias, dívida ativa e orientações tributárias.",
    category: "Tributos",
    kind: "external",
    sourceLabel: "2a via IPTU / Taxas Imobiliarias",
    sourceUrl: EXTERNAL_LINKS.iptu,
    requiredElements: ["2a via", "Taxas", "Dívida ativa", "Contato do setor"],
    columns: ["Serviço", "Descrição", "Link", "Observação"],
    rows: [["2a via IPTU", "Acesso externo GeoSIAP", EXTERNAL_LINKS.iptu, "Integração externa"], ["Dívida ativa", "Consulta/quitação", EXTERNAL_LINKS.transparencia, "Confirmar módulo"]],
  },
  "nota-fiscal-eletronica": {
    title: "Nota Fiscal Eletronica",
    subtitle: "Acesso ao emissor nacional de NFS-e e orientações para prestadores de serviço.",
    category: "Tributos",
    kind: "external",
    sourceLabel: "NFS-e",
    sourceUrl: EXTERNAL_LINKS.nfse,
    requiredElements: ["Link externo", "Orientações", "Contato fiscal", "Perguntas frequentes"],
    columns: ["Serviço", "Descrição", "Link", "Responsável"],
    rows: [["NFS-e", "Emissor Nacional", EXTERNAL_LINKS.nfse, "Finanças"], ["ISS Online", "Módulo municipal", EXTERNAL_LINKS.iss, "Finanças"]],
  },
  agendamento: {
    title: "Agendamento",
    subtitle: "Página para organizar atendimentos por unidade, assunto, data e situação.",
    category: "Serviços",
    kind: "table",
    requiredElements: ["Unidade", "Serviço", "Agenda", "Canal de atendimento"],
    columns: ["Unidade", "Serviço", "Agenda", "Canal"],
    rows: [["Prefeitura", "Atendimento geral", "Não declarado", "Presencial"], ["Secretaria", "Atendimento setorial", "Não declarado", "Não declarado"]],
  },
  faq: {
    title: "Perguntas Frequentes",
    subtitle: "Respostas objetivas para os temas mais buscados no portal municipal.",
    category: "Atendimento",
    kind: "documents",
    sourceLabel: "Perguntas frequentes antigas",
    sourceUrl: "https://www.roseira.sp.gov.br/prefeitura/perguntas-frequentes",
    requiredElements: ["Pergunta", "Resposta", "Tema", "Última atualização"],
    columns: ["Tema", "Pergunta", "Resposta", "Atualização"],
    rows: [["Serviços", "Como solicitar atendimento?", "Não declarado", "Não declarado"], ["Transparência", "Onde consultar documentos?", "Não declarado", "Não declarado"]],
  },
  comunicados: {
    title: "Comunicados",
    subtitle: "Lista de avisos oficiais, comunicados administrativos e orientações temporarias.",
    category: "Comunicação",
    kind: "documents",
    requiredElements: ["Titulo", "Data", "Setor", "Arquivo ou link"],
    columns: ["Titulo", "Setor", "Data", "Arquivo"],
    rows: [["Comunicado demonstrativo", "Administração", "Não declarado", "Não declarado"]],
  },
  eventos: {
    title: "Agenda de Eventos",
    subtitle: "Calendário de eventos oficiais, audiências, campanhas e reuniões públicas.",
    category: "Comunicação",
    kind: "table",
    sourceLabel: "Eventos antigos",
    sourceUrl: "https://www.roseira.sp.gov.br/evento",
    requiredElements: ["Evento", "Data", "Local", "Responsável"],
    columns: ["Evento", "Data", "Local", "Responsável"],
    rows: [["Audiência pública", "Não declarado", "Não declarado", "Não declarado"], ["Campanha municipal", "Não declarado", "Não declarado", "Não declarado"]],
  },
  campanhas: {
    title: "Campanhas",
    subtitle: "Campanhas institucionais por Área, período, público-alvo e materiais de divulgação.",
    category: "Comunicação",
    kind: "documents",
    requiredElements: ["Campanha", "Período", "Área responsável", "Materiais"],
    columns: ["Campanha", "Período", "Área", "Material"],
    rows: [["Campanha demonstrativa", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "boletins-oficiais": {
    title: "Boletins Oficiais",
    subtitle: "Publicações oficiais seriadas com data, edição, arquivo e busca.",
    category: "Publicações",
    kind: "table",
    requiredElements: ["Edição", "Data", "Descrição", "Arquivo pesquisável"],
    columns: ["Edição", "Data", "Descrição", "Arquivo"],
    rows: [["000/2026", "Não declarado", "Boletim demonstrativo", "Não declarado"]],
  },
  "dispensas-inexigibilidades": {
    title: "Dispensas e Inexigibilidades",
    subtitle: "Relação sequencial de contratações diretas, fundamentos, documentos e situação.",
    category: "Compras Públicas",
    kind: "table",
    sourceLabel: "Dispensa de Licitação antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/licitacao/categoria/17/dispensa-de-licitacao/",
    requiredElements: ["Número", "Objeto", "Fundamento", "Documentos da fase interna e externa"],
    columns: ["Processo", "Objeto", "Fundamento", "Documentos"],
    rows: [["000/2026", "Objeto demonstrativo", "Não declarado", "Edital, parecer, termo e públicação"], ["001/2026", "Objeto demonstrativo", "Não declarado", "Documentos pendentes"]],
  },
  contratos: {
    title: "Contratos",
    subtitle: "Relação de contratos, aditivos, fiscais, valores, vigência e documentos.",
    category: "Compras Públicas",
    kind: "table",
    sourceLabel: "Portal da Transparência",
    sourceUrl: EXTERNAL_LINKS.transparencia,
    requiredElements: ["Contrato", "Fornecedor", "Objeto", "Valor", "Vigencia", "Fiscal", "Inteiro teor"],
    columns: ["Contrato", "Fornecedor", "Objeto", "Valor", "Fiscal"],
    rows: [["000/2026", "Não declarado", "Objeto demonstrativo", "Não declarado", "Não declarado"], ["001/2026", "Não declarado", "Objeto demonstrativo", "Não declarado", "Não declarado"]],
  },
  aditivos: {
    title: "Aditivos",
    subtitle: "Termos aditivos vinculados aos contratos, com objeto, valor, prazo e documento integral.",
    category: "Compras Públicas",
    kind: "table",
    requiredElements: ["Contrato vinculado", "Tipo de aditivo", "Data", "Inteiro teor"],
    columns: ["Contrato", "Aditivo", "Tipo", "Data", "Arquivo"],
    rows: [["000/2026", "1o Termo Aditivo", "Prazo/valor", "Não declarado", "Não declarado"]],
  },
  "atas-registro-precos": {
    title: "Atas de Registro de Precos",
    subtitle: "Atas de registro de preços, adesões, fornecedores, itens e vigência.",
    category: "Compras Públicas",
    kind: "table",
    sourceLabel: "Registro de Precos antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/licitacao/categoria/25/registro-de-precos/",
    requiredElements: ["Ata", "Fornecedor", "Itens", "Precos", "Vigencia"],
    columns: ["Ata", "Fornecedor", "Objeto", "Vigencia", "Itens"],
    rows: [["000/2026", "Não declarado", "Objeto demonstrativo", "Não declarado", "Tabela de itens"], ["001/2026", "Não declarado", "Objeto demonstrativo", "Não declarado", "Tabela de itens"]],
  },
  fornecedores: {
    title: "Fornecedores",
    subtitle: "Cadastro demonstrativo de fornecedores contratados, CNPJ, contratos e situação.",
    category: "Compras Públicas",
    kind: "table",
    requiredElements: ["Fornecedor", "CNPJ", "Contrato", "Situação"],
    columns: ["Fornecedor", "CNPJ", "Contrato", "Situação"],
    rows: [["Fornecedor demonstrativo", "Não declarado", "000/2026", "Ativo"], ["Fornecedor demonstrativo", "Não declarado", "001/2026", "Ativo"]],
  },
  pncp: {
    title: "PNCP",
    subtitle: "Área de referência para públicações no Portal Nacional de Contratações Públicas.",
    category: "Compras Públicas",
    kind: "external",
    requiredElements: ["Link PNCP", "Processo vinculado", "Objeto", "Data de públicação"],
    columns: ["Processo", "Objeto", "Publicação", "Link PNCP"],
    rows: [["000/2026", "Objeto demonstrativo", "Não declarado", "Não declarado"]],
  },
  "portal-transparencia": {
    title: "Portal da Transparência",
    subtitle: "Acesso central para receitas, despesas, contratos, folha, convênios, obras e demais dados fiscais.",
    category: "Transparência",
    kind: "external",
    sourceLabel: "GeoSIAP Portal da Transparência",
    sourceUrl: EXTERNAL_LINKS.transparencia,
    requiredElements: ["Link visível", "Busca", "Filtros", "Exportação de dados", "Séries históricas"],
    columns: ["Módulo", "Conteúdo esperado", "Origem", "Status estrutural"],
    rows: [["Receitas", "Arrecadação e transferências recebidas", "Portal externo", "Página criada"], ["Despesas", "Empenhos, liquidações e pagamentos", "Portal externo", "Página criada"], ["Contratos", "Contratos e aditivos", "Portal externo", "Página criada"]],
  },
  receitas: {
    title: "Receitas",
    subtitle: "Consulta de receitas, arrecadação, transferências recebidas e filtros por período.",
    category: "Transparência",
    kind: "table",
    requiredElements: ["Período", "Fonte", "Valor arrecadado", "Transferências recebidas", "Exportação"],
    columns: ["Período", "Fonte", "Previsão", "Arrecadado", "Exportar"],
    rows: [["2026", "Receita demonstrativa", "Não declarado", "Não declarado", "CSV/PDF"], ["2025", "Transferencia demonstrativa", "Não declarado", "Não declarado", "CSV/PDF"]],
  },
  despesas: {
    title: "Despesas",
    subtitle: "Consulta de empenhos, liquidações, pagamentos, favorecidos e ordem cronológica.",
    category: "Transparência",
    kind: "table",
    requiredElements: ["Empenho", "Favorecido", "Liquidação", "Pagamento", "Ordem cronológica"],
    columns: ["Empenho", "Favorecido", "Objeto", "Valor", "Pagamento"],
    rows: [["000/2026", "Não declarado", "Despesa demonstrativa", "Não declarado", "Não declarado"], ["001/2026", "Não declarado", "Despesa demonstrativa", "Não declarado", "Não declarado"]],
  },
  "folha-pagamento": {
    title: "Folha de Pagamento",
    subtitle: "Relação nominal de servidores, remuneração, cargos, vínculos e tabela remuneratória.",
    category: "Pessoal",
    kind: "table",
    requiredElements: ["Servidor", "Cargo", "Lotação", "Remuneração", "Tabela remuneratória"],
    columns: ["Servidor", "Cargo", "Lotação", "Remuneração", "Competência"],
    rows: [["Não declarado", "Cargo demonstrativo", "Lotação demonstrativa", "Não declarado", "2026"], ["Não declarado", "Cargo demonstrativo", "Lotação demonstrativa", "Não declarado", "2026"]],
  },
  "diarias-passagens": {
    title: "Diarias e Passagens",
    subtitle: "Detalhamento de diárias concedidas, passagens, beneficiarios, destino, motivo e tabela de valores.",
    category: "Pessoal",
    kind: "table",
    requiredElements: ["Beneficiário", "Destino", "Período", "Motivo", "Valor", "Tabela de diárias"],
    columns: ["Beneficiário", "Destino", "Período", "Motivo", "Valor"],
    rows: [["Não declarado", "Destino demonstrativo", "Não declarado", "Não declarado", "Não declarado"], ["Tabela de valores", "Municipal/estadual", "Vigente", "Referência normativa", "Não declarado"]],
  },
  "convenios-repasses": {
    title: "Convênios e Repasses",
    subtitle: "Transferências recebidas e realizadas, convênios, parcerias e acordos sem transferência financeira.",
    category: "Transparência",
    kind: "table",
    requiredElements: ["Convênio", "Concedente/convenente", "Objeto", "Valor", "Prestação de contas"],
    columns: ["Instrumento", "Parte", "Objeto", "Valor", "Situação"],
    rows: [["Convênio demonstrativo", "Não declarado", "Objeto demonstrativo", "Não declarado", "Não declarado"], ["Acordo sem transferência", "Não declarado", "Objeto demonstrativo", "Não se aplica", "Não declarado"]],
  },
  "obras-públicas": {
    title: "Obras Públicas",
    subtitle: "Quadro de obras com execucao física e financeira, quantitativos, contratos e obras paralisadas.",
    category: "Transparência",
    kind: "table",
    requiredElements: ["Obra", "Contrato", "Execução física", "Execução financeira", "Situação", "Fotos/medições"],
    columns: ["Obra", "Contrato", "Físico", "Financeiro", "Situação"],
    rows: [["Obra demonstrativa", "000/2026", "0%", "Não declarado", "Em planejamento"], ["Obra paralisada", "Não declarado", "Não declarado", "Não declarado", "Declaração pendente"]],
  },
  "ppa-ldo-loa": {
    title: "PPA, LDO e LOA",
    subtitle: "Instrumentos de planejamento e orcamento com arquivos, exercícios e anexos.",
    category: "Orcamento",
    kind: "documents",
    requiredElements: ["PPA", "LDO", "LOA", "Anexos", "Histórico"],
    columns: ["Instrumento", "Exercício", "Arquivo", "Situação"],
    rows: [["PPA", "2026", "Não declarado", "Pendente"], ["LDO", "2026", "Não declarado", "Pendente"], ["LOA", "2026", "Não declarado", "Pendente"]],
  },
  "rreo-rgf": {
    title: "RREO e RGF",
    subtitle: "Relatórios fiscais por período, anexos e arquivos pesquisáveis.",
    category: "Orcamento",
    kind: "table",
    requiredElements: ["Relatório", "Quadrimestre/bimestre", "Exercício", "Arquivo"],
    columns: ["Relatório", "Período", "Exercício", "Arquivo"],
    rows: [["RREO", "Bimestre demonstrativo", "2026", "Não declarado"], ["RGF", "Quadrimestre demonstrativo", "2026", "Não declarado"]],
  },
  "prestacao-contas": {
    title: "Prestação de Contas",
    subtitle: "Prestação de contas anual, relatórios de gestão, julgamento legislativo e decisões do Tribunal de Contas.",
    category: "Controle",
    kind: "documents",
    sourceLabel: "Contas Públicas antigas",
    sourceUrl: "https://www.roseira.sp.gov.br/conta-pública",
    requiredElements: ["Ano anterior", "Relatório de gestão", "Parecer prévio", "Julgamento legislativo"],
    columns: ["Exercício", "Documento", "Órgão", "Arquivo"],
    rows: [["2025", "Prestação de contas", "Executivo", "Não declarado"], ["2025", "Julgamento das contas", "Legislativo", "Não declarado"]],
  },
  "parecer-tce": {
    title: "Parecer do Tribunal de Contas",
    subtitle: "Pareceres, decisões e julgamentos relativos às contas municipais.",
    category: "Controle",
    kind: "documents",
    requiredElements: ["Exercício", "Parecer prévio", "Decisão", "Link ou arquivo"],
    columns: ["Exercício", "Documento", "Situação", "Arquivo"],
    rows: [["2025", "Parecer prévio", "Não declarado", "Não declarado"], ["2024", "Decisão/Julgamento", "Não declarado", "Não declarado"]],
  },
  "dados-abertos": {
    title: "Dados Abertos",
    subtitle: "Catálogo de bases públicas reutilizáveis, formatos abertos, dicionário de dados e atualização.",
    category: "Transparência",
    kind: "table",
    requiredElements: ["Base de dados", "Formato aberto", "Periodicidade", "Download", "Dicionario"],
    columns: ["Base", "Formato", "Periodicidade", "Download", "Dicionario"],
    rows: [["Receitas", "CSV/JSON", "Mensal", "Não declarado", "Não declarado"], ["Despesas", "CSV/JSON", "Mensal", "Não declarado", "Não declarado"]],
  },
  "radar-transparencia": {
    title: "Radar da Transparência / Matriz Atricon",
    subtitle: "Página para evidências da avaliação PNTP, matriz de critérios, plano de ação e links de verificação.",
    category: "Controle",
    kind: "table",
    requiredElements: ["Critério", "Status", "Evidência", "Plano de ação"],
    columns: ["Critério", "Exigência", "Status estrutural", "Evidência"],
    rows: [["PNTP comum", "Página/funcionalidade exigida", "Estrutura criada", "Conteúdo pendente"], ["PNTP executivo", "Tabela ou documento específico", "Estrutura criada", "Conteúdo pendente"]],
  },
  "codigo-tributario": {
    title: "Código Tributário",
    subtitle: "Página para o código tributário municipal, leis complementares e anexos fiscais.",
    category: "Legislação",
    kind: "documents",
    requiredElements: ["Norma vigente", "Alterações", "Anexos", "Download"],
    columns: ["Norma", "Descrição", "Data", "Arquivo"],
    rows: [["Código Tributário", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "plano-diretor": {
    title: "Plano Diretor",
    subtitle: "Plano diretor, mapas, anexos, revisões, audiências e legislação urbanística.",
    category: "Legislação",
    kind: "documents",
    requiredElements: ["Lei vigente", "Mapas", "Audiências", "Anexos"],
    columns: ["Documento", "Descrição", "Data", "Arquivo"],
    rows: [["Plano Diretor", "Não declarado", "Não declarado", "Não declarado"], ["Audiência pública", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "lei-organica": {
    title: "Lei Orgânica Municipal",
    subtitle: "Texto da Lei Orgânica, emendas, consolidação e arquivo pesquisável.",
    category: "Legislação",
    kind: "documents",
    requiredElements: ["Texto consolidado", "Emendas", "Arquivo pesquisável", "Histórico"],
    columns: ["Documento", "Descrição", "Data", "Arquivo"],
    rows: [["Lei Orgânica", "Texto consolidado", "Não declarado", "Não declarado"], ["Emendas", "Histórico", "Não declarado", "Não declarado"]],
  },
  "diario-oficial": {
    title: "Diario Oficial",
    subtitle: "Edicoes do diario oficial, busca por período, tipo de ato e arquivo.",
    category: "Publicações",
    kind: "table",
    requiredElements: ["Edição", "Data", "Tipo de ato", "Arquivo"],
    columns: ["Edição", "Data", "Tipo", "Arquivo"],
    rows: [["000/2026", "Não declarado", "Atos oficiais", "Não declarado"], ["001/2026", "Não declarado", "Publicação", "Não declarado"]],
  },
  "atos-oficiais": {
    title: "Atos Oficiais",
    subtitle: "Publicações oficiais diversas com classificação, data, setor e arquivo.",
    category: "Publicações",
    kind: "table",
    sourceLabel: "Publicações oficiais antigas",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/11/publicacoes-oficiais",
    requiredElements: ["Ato", "Data", "Setor", "Arquivo"],
    columns: ["Ato", "Setor", "Data", "Arquivo"],
    rows: [["Publicação demonstrativa", "Administração", "Não declarado", "Não declarado"]],
  },
  ouvidoria: {
    title: "Ouvidoria",
    subtitle: "Canais para manifestações, consulta de chamados, relatórios e pesquisa de satisfação.",
    category: "Controle Social",
    kind: "service",
    sourceLabel: "Ouvidoria antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/ouvidoria",
    requiredElements: ["Registrar manifestação", "Consultar chamado", "Relatórios", "Pesquisa de satisfação"],
    columns: ["Canal", "Finalidade", "Link", "Status"],
    rows: [["Novo chamado anônimo", "Registrar manifestação", "https://www.roseira.sp.gov.br/ouvidoria/chamado-anonimo/#novo-chamado", "Referência externa"], ["Relatórios", "Prestação de contas da ouvidoria", "https://www.roseira.sp.gov.br/ouvidoria/relatorio/relatorio-download/1/", "Referência externa"]],
  },
  "e-sic": {
    title: "e-SIC",
    subtitle: "Serviço de Informação ao Cidadão, pedidos de acesso, formulários, prazos e relatórios LAI.",
    category: "Acesso a Informação",
    kind: "service",
    sourceLabel: "SIC antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/sic-serviço-de-informacao-ao-cidadao",
    requiredElements: ["Pedido de informação", "Formulario", "Prazos", "Relatório estatístico", "Informações sigilosas/desclassificadas"],
    columns: ["Item", "Descrição", "Link/arquivo", "Status"],
    rows: [["Pedido de informação", "Fluxo de solicitação", "Não declarado", "Estrutura criada"], ["Relatório anual LAI", "Estatísticas de pedidos", "Não declarado", "Conteúdo pendente"], ["Documentos classificados/desclassificados", "Lista anual", "Não declarado", "Conteúdo pendente"]],
  },
  "endereco-telefones": {
    title: "Endereço e Telefones",
    subtitle: "Contatos por setor, mapa, telefones, e-mails e horarios.",
    category: "Atendimento",
    kind: "table",
    requiredElements: ["Endereço", "Telefone", "E-mail", "Mapa", "Horário"],
    columns: ["Setor", "Endereço", "Telefone", "E-mail", "Horário"],
    rows: [["Prefeitura", "Não declarado", "Não declarado", "Não declarado", "Não declarado"], ["Ouvidoria/SIC", "Não declarado", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "horarios-atendimento-contato": {
    title: "Horários de Atendimento",
    subtitle: "Quadro de horarios por unidade e canal de atendimento.",
    category: "Atendimento",
    kind: "table",
    requiredElements: ["Unidade", "Horário", "Canal", "Observação"],
    columns: ["Unidade", "Horário", "Canal", "Observação"],
    rows: [["Atendimento presencial", "Não declarado", "Balcão", "Não declarado"], ["Atendimento digital", "Não declarado", "E-mail/formulário", "Não declarado"]],
  },
  "mapa-localizacao": {
    title: "Mapa de Localização",
    subtitle: "Mapa e dados de localização das unidades da Prefeitura.",
    category: "Atendimento",
    kind: "service",
    requiredElements: ["Endereço", "Mapa", "Rotas", "Unidades vinculadas"],
    columns: ["Unidade", "Endereço", "Mapa", "Observação"],
    rows: [["Prefeitura Municipal", "Não declarado", "Mapa incorporado", "Confirmar endereco"], ["Unidade municipal", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "redes-sociais": {
    title: "Redes Sociais",
    subtitle: "Canais oficiais de comunicação digital da Prefeitura.",
    category: "Comunicação",
    kind: "table",
    requiredElements: ["Rede", "URL oficial", "Responsável", "Finalidade"],
    columns: ["Canal", "URL", "Responsável", "Finalidade"],
    rows: [["Facebook", "Não declarado", "Comunicação", "Notícias e avisos"], ["Instagram", "Não declarado", "Comunicação", "Notícias e avisos"]],
  },
  "mapa-site": {
    title: "Mapa do Site",
    subtitle: "Índice navegável das áreas institucionais, serviços, transparência, legislação e contato.",
    category: "Acesso Principal",
    kind: "documents",
    sourceLabel: "Mapa do site antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/mapa-site/",
    requiredElements: ["Índice por categoria", "Links diretos", "Atualização", "Acesso pelo rodapé/header"],
    columns: ["Grupo", "Descrição", "Status"],
    rows: [["A Prefeitura", "Páginas institucionais", "Estrutura criada"], ["Serviços", "Páginas de atendimento", "Estrutura criada"], ["Transparência", "Páginas de controle e dados", "Estrutura criada"]],
  },
  "galeria-fotos": {
    title: "Galeria de Fotos",
    subtitle: "Espaco para fotos da cidade, eventos, obras e registros institucionais.",
    category: "Cidade",
    kind: "documents",
    sourceLabel: "Fotos da cidade",
    sourceUrl: "https://www.roseira.sp.gov.br/album-de-fotos/foto/1/cidade/",
    requiredElements: ["Album", "Imagem", "Legenda", "Data"],
    columns: ["Album", "Descrição", "Arquivo"],
    rows: [["Cidade", "Registros urbanos e pontos de interesse", "Não declarado"], ["Eventos", "Registros de eventos oficiais", "Não declarado"]],
  },
  "termos-uso": {
    title: "Termos de Uso",
    subtitle: "Regras de uso do portal, responsabilidades, direitos do usuário e condições gerais.",
    category: "Legal",
    kind: "documents",
    sourceLabel: "Termos de uso antigos",
    sourceUrl: "https://www.roseira.sp.gov.br/termos-e-condições-gerais-de-uso/",
    requiredElements: ["Finalidade do portal", "Responsabilidades", "Direitos do usuário", "Data de atualização"],
    columns: ["Seção", "Conteúdo esperado", "Status"],
    rows: [["Uso do portal", "Descrição das regras gerais", "Conteúdo pendente"], ["Responsabilidades", "Condições e limites", "Conteúdo pendente"]],
  },
  "politica-cookies": {
    title: "Politica de Cookies",
    subtitle: "Informações sobre cookies, preferências, categorias e base legal de tratamento.",
    category: "Legal",
    kind: "documents",
    sourceLabel: "Politica de cookies antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/politicas-de-cookies/",
    requiredElements: ["Categorias de cookies", "Finalidade", "Preferências", "Data de atualização"],
    columns: ["Categoria", "Finalidade", "Obrigatorio"],
    rows: [["Necessários", "Funcionamento do portal", "Sim"], ["Desempenho", "Medição de uso", "Não"]],
  },
  lgpd: {
    title: "LGPD",
    subtitle: "Canal de privacidade, encarregado, direitos do titular e documentos sobre protecao de dados.",
    category: "Legal",
    kind: "documents",
    sourceLabel: "LGPD antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/lgpd/",
    requiredElements: ["Encarregado", "Canal de atendimento", "Direitos do titular", "Políticas e avisos"],
    columns: ["Item", "Descrição", "Status"],
    rows: [["Encarregado", "Dados de contato", "Não declarado"], ["Solicitação do titular", "Fluxo de atendimento", "Conteúdo pendente"]],
  },
  "audiencias-públicas": {
    title: "Audiências Públicas",
    subtitle: "Calendário, convocações, atas, materiais e registros de audiências públicas.",
    category: "Participação Social",
    kind: "table",
    sourceLabel: "Audiências públicas antigas",
    sourceUrl: "https://www.roseira.sp.gov.br/audiencia-pública",
    requiredElements: ["Data", "Tema", "Local", "Ata", "Materiais"],
    columns: ["Tema", "Data", "Local", "Documento"],
    rows: [["Audiência demonstrativa", "Não declarado", "Não declarado", "Ata/material pendente"], ["Prestação de contas", "Não declarado", "Não declarado", "Documento pendente"]],
  },
  "concorrencia-pública": {
    title: "Concorrencia Publica",
    subtitle: "Categoria específica de licitacoes para processos de concorrencia pública.",
    category: "Compras Públicas",
    kind: "table",
    sourceLabel: "Concorrencia Publica antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/licitacao/categoria/15/concorrencia-pública/",
    requiredElements: ["Processo", "Objeto", "Edital", "Situação"],
    columns: ["Processo", "Objeto", "Data", "Situação"],
    rows: [["000/2026", "Objeto demonstrativo", "Não declarado", "Pendente"]],
  },
  "chamada-pública": {
    title: "Chamada Publica",
    subtitle: "Categoria específica para chamamentos e chamadas públicas.",
    category: "Compras Públicas",
    kind: "table",
    sourceLabel: "Chamada Publica antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/licitacao/categoria/16/chamada-pública/",
    requiredElements: ["Processo", "Objeto", "Documentos", "Resultado"],
    columns: ["Processo", "Objeto", "Data", "Situação"],
    rows: [["000/2026", "Objeto demonstrativo", "Não declarado", "Pendente"]],
  },
  "pregao-presencial": {
    title: "Pregao Presencial",
    subtitle: "Categoria específica para pregões presenciais e seus anexos.",
    category: "Compras Públicas",
    kind: "table",
    sourceLabel: "Pregao Presencial antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/licitacao/categoria/22/pregao-presencial/",
    requiredElements: ["Processo", "Objeto", "Edital", "Ata", "Resultado"],
    columns: ["Processo", "Objeto", "Data", "Situação"],
    rows: [["000/2026", "Objeto demonstrativo", "Não declarado", "Pendente"]],
  },
  "tomada-precos": {
    title: "Tomada de Precos",
    subtitle: "Categoria específica para tomadas de preços e documentos vinculados.",
    category: "Compras Públicas",
    kind: "table",
    sourceLabel: "Tomada de Precos antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/licitacao/categoria/23/tomada-de-precos/",
    requiredElements: ["Processo", "Objeto", "Edital", "Resultado"],
    columns: ["Processo", "Objeto", "Data", "Situação"],
    rows: [["000/2026", "Objeto demonstrativo", "Não declarado", "Pendente"]],
  },
  leilao: {
    title: "Leilao",
    subtitle: "Categoria específica para leilões, bens, editais e resultados.",
    category: "Compras Públicas",
    kind: "table",
    sourceLabel: "Leilao antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/licitacao/categoria/20/leilao/",
    requiredElements: ["Processo", "Objeto", "Bens", "Edital", "Resultado"],
    columns: ["Processo", "Objeto", "Data", "Situação"],
    rows: [["000/2026", "Objeto demonstrativo", "Não declarado", "Pendente"]],
  },
  "cadastro-inscrição-municipal": {
    title: "Cadastro de Inscrição Municipal",
    subtitle: "Orientações e acesso para inscrição municipal de empresas e prestadores.",
    category: "Serviços a Empresa",
    kind: "service",
    sourceLabel: "Cadastro antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/1/cadastro-de-inscrição-municipal",
    requiredElements: ["Quem pode solicitar", "Documentos", "Prazo", "Canal de atendimento"],
    columns: ["Serviço", "Descrição", "Canal"],
    rows: [["Inscrição Municipal", "Cadastro e regularização", "Não declarado"]],
  },
  "bolsa-familia": {
    title: "Bolsa Familia",
    subtitle: "Informações sobre atendimento, cadastro, atualização cadastral e unidade responsável.",
    category: "Assistência Social",
    kind: "service",
    sourceLabel: "Bolsa Familia antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/bolsa-familia",
    requiredElements: ["Público-alvo", "Documentos", "Unidade", "Horário"],
    columns: ["Serviço", "Descrição", "Responsável"],
    rows: [["Atendimento Bolsa Familia", "Cadastro e atualização", "Assistência Social"]],
  },
  "banco-povo": {
    title: "Banco do Povo",
    subtitle: "Canal de apoio a empreendedores, crédito, orientações e atendimento.",
    category: "Desenvolvimento",
    kind: "service",
    sourceLabel: "Banco do Povo antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/cria/banco-povo",
    requiredElements: ["Serviço", "Público-alvo", "Documentos", "Contato"],
    columns: ["Serviço", "Descrição", "Responsável"],
    rows: [["Banco do Povo Paulista", "Orientação e crédito", "Não declarado"]],
  },
  "acessa-sp": {
    title: "Acessa SP",
    subtitle: "Informações sobre inclusão digital, acesso à internet e serviços apoiados.",
    category: "Serviços",
    kind: "service",
    sourceLabel: "Acessa SP antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/cria/acessa-sp",
    requiredElements: ["Endereço", "Horário", "Serviços", "Contato"],
    columns: ["Serviço", "Descrição", "Status"],
    rows: [["Acessa SP", "Atendimento digital apoiado", "Não declarado"]],
  },
  "conselho-tutelar": {
    title: "Conselho Tutelar",
    subtitle: "Informações de atendimento, contatos, escala e documentos do Conselho Tutelar.",
    category: "Protecao Social",
    kind: "service",
    sourceLabel: "Conselho Tutelar antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/cria/conselho-tutelar",
    requiredElements: ["Contato", "Endereço", "Horário", "Plantão"],
    columns: ["Canal", "Descrição", "Contato"],
    rows: [["Atendimento", "Conselho Tutelar", "Não declarado"]],
  },
  "junta-militar": {
    title: "Junta Militar",
    subtitle: "Alistamento militar, documentos, prazos e atendimento municipal.",
    category: "Serviços",
    kind: "service",
    sourceLabel: "Junta Militar antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/junta-militar",
    requiredElements: ["Serviço", "Documentos", "Prazo", "Contato"],
    columns: ["Serviço", "Descrição", "Canal"],
    rows: [["Alistamento", "Orientações e atendimento", "Não declarado"]],
  },
  covid: {
    title: "COVID-19",
    subtitle: "Área histórica para comunicados, boletins, orientações e documentos relacionados.",
    category: "Saúde",
    kind: "documents",
    sourceLabel: "COVID-19 antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/covid",
    requiredElements: ["Boletins", "Comunicados", "Orientações", "Arquivos"],
    columns: ["Bloco", "Descrição", "Status"],
    rows: [["Boletins", "Publicações históricas", "Conteúdo pendente"], ["Orientações", "Informativos oficiais", "Conteúdo pendente"]],
  },
  "portal-educação": {
    title: "Portal da Educação",
    subtitle: "Central de acesso a informações educacionais, escolas, conselhos e serviços da rede municipal.",
    category: "Educação",
    kind: "service",
    sourceLabel: "Portal da Educação antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/portal-educação",
    requiredElements: ["Escolas", "Calendário", "Conselhos", "Serviços"],
    columns: ["Área", "Descrição", "Status"],
    rows: [["Rede municipal", "Informações educacionais", "Conteúdo pendente"], ["Conselhos", "CME e alimentação escolar", "Estrutura criada"]],
  },
  "conselho-educação": {
    title: "Conselho Municipal de Educação",
    subtitle: "Composição, atas, documentos e calendário do Conselho Municipal de Educação.",
    category: "Educação",
    kind: "table",
    sourceLabel: "Conselho de Educação antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/14/conselho-municipal-de-educação",
    requiredElements: ["Composição", "Atas", "Mandato", "Calendário"],
    columns: ["Documento", "Período", "Arquivo", "Status"],
    rows: [["Composição", "Não declarado", "Não declarado", "Pendente"], ["Ata", "Não declarado", "Não declarado", "Pendente"]],
  },
  "conselho-alimentacao-escolar": {
    title: "Conselho de Alimentação Escolar",
    subtitle: "Composição, atas, fiscalização e documentos do Conselho de Alimentação Escolar.",
    category: "Educação",
    kind: "table",
    sourceLabel: "CAE antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/15/conselho-de-alimentacao-escolar",
    requiredElements: ["Composição", "Atas", "Prestação de contas", "Calendário"],
    columns: ["Documento", "Período", "Arquivo", "Status"],
    rows: [["Composição", "Não declarado", "Não declarado", "Pendente"], ["Ata", "Não declarado", "Não declarado", "Pendente"]],
  },
  "vagas-creche": {
    title: "Vagas em Creche",
    subtitle: "Lista de espera, critérios, posição, unidade e atualização das vagas em creche.",
    category: "Educação",
    kind: "table",
    sourceLabel: "Vagas em Creche antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/16/vagas-em-creche",
    requiredElements: ["Criança/responsável", "Unidade", "Posição", "Data de atualização"],
    columns: ["Unidade", "Faixa etária", "Posição/Fila", "Atualização"],
    rows: [["Creche demonstrativa", "0 a 3 anos", "Não declarado", "Não declarado"]],
  },
  "educação-tematica": {
    title: "Educação",
    subtitle: "Página temática da educação com documentos, programas, escolas, conselhos e serviços.",
    category: "Área Tematica",
    kind: "documents",
    sourceLabel: "Educação antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/12/educação",
    requiredElements: ["Programas", "Documentos", "Escolas", "Conselhos"],
    columns: ["Bloco", "Descrição", "Status"],
    rows: [["Programas", "Ações e projetos", "Conteúdo pendente"], ["Documentos", "Arquivos oficiais", "Conteúdo pendente"]],
  },
  "saude-tematica": {
    title: "Saúde",
    subtitle: "Página temática da saúde com serviços, unidades, documentos de gestão e informações obrigatórias.",
    category: "Área Tematica",
    kind: "documents",
    sourceLabel: "Saúde antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/5/saude",
    requiredElements: ["Serviços", "Unidades", "Plano de saúde", "Estoque de medicamentos"],
    columns: ["Bloco", "Descrição", "Status"],
    rows: [["Gestao da saúde", "Plano, programação e relatório", "Conteúdo pendente"], ["Medicamentos", "Estoque e disponibilidade", "Conteúdo pendente"]],
  },
  "esporte-tematica": {
    title: "Esporte",
    subtitle: "Página temática de esporte com atividades, projetos, locais e calendário.",
    category: "Área Tematica",
    kind: "documents",
    sourceLabel: "Esporte antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/6/esporte",
    requiredElements: ["Atividades", "Projetos", "Locais", "Calendário"],
    columns: ["Bloco", "Descrição", "Status"],
    rows: [["Projetos esportivos", "Programas e atividades", "Conteúdo pendente"]],
  },
  "turismo-cultura": {
    title: "Turismo e Cultura",
    subtitle: "Atrativos, eventos culturais, roteiros, equipamentos e politicas culturais.",
    category: "Área Tematica",
    kind: "documents",
    sourceLabel: "Turismo e Cultura antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/9/turismo-e-cultura",
    requiredElements: ["Atrativos", "Eventos", "Equipamentos", "Documentos"],
    columns: ["Bloco", "Descrição", "Status"],
    rows: [["Turismo", "Atrativos e roteiros", "Conteúdo pendente"], ["Cultura", "Programas e eventos", "Conteúdo pendente"]],
  },
  "meio-ambiente": {
    title: "Meio Ambiente",
    subtitle: "Políticas ambientais, programas, licenças, arborização e ações municipais.",
    category: "Área Tematica",
    kind: "documents",
    sourceLabel: "Meio Ambiente antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/meio-ambiente",
    requiredElements: ["Programas", "Documentos", "Licencas", "Contato"],
    columns: ["Bloco", "Descrição", "Status"],
    rows: [["Programas ambientais", "Ações e documentos", "Conteúdo pendente"]],
  },
  "plano-arborizacao": {
    title: "Plano Municipal de Arborização Urbana",
    subtitle: "Plano, anexos, mapas, metas e documentos de arborização urbana.",
    category: "Meio Ambiente",
    kind: "documents",
    sourceLabel: "Plano de Arborização antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/17/plano-municipal-de-arborizacao-urbana",
    requiredElements: ["Plano", "Anexos", "Mapas", "Atualização"],
    columns: ["Documento", "Descrição", "Arquivo"],
    rows: [["Plano Municipal", "Arborização urbana", "Não declarado"]],
  },
  "centro-esterilizacao": {
    title: "Centro de Esterilização de Animais",
    subtitle: "Informações, agendamento, critérios e orientações do centro de esterilização.",
    category: "Meio Ambiente",
    kind: "service",
    sourceLabel: "Centro de Esterilização antigo",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/20/centro-de-esterilizacao-de-animais-de-roseira",
    requiredElements: ["Agendamento", "Critérios", "Local", "Contato"],
    columns: ["Serviço", "Descrição", "Canal"],
    rows: [["Esterilização", "Orientações e atendimento", "Não declarado"]],
  },
  "lei-aldir-blanc": {
    title: "Lei Aldir Blanc 2",
    subtitle: "Editais, resultados, documentos e prestação de contas da politica cultural.",
    category: "Cultura",
    kind: "table",
    sourceLabel: "Lei Aldir Blanc 2 antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/19/lei-aldir-blanc-2",
    requiredElements: ["Edital", "Inscrições", "Resultado", "Prestação de contas"],
    columns: ["Documento", "Data", "Arquivo", "Status"],
    rows: [["Edital demonstrativo", "Não declarado", "Não declarado", "Pendente"]],
  },
  "vagas-emprego": {
    title: "Vagas de Emprego",
    subtitle: "Divulgação de oportunidades, requisitos, contato e situação das vagas.",
    category: "Desenvolvimento",
    kind: "table",
    sourceLabel: "Vagas de Emprego antiga",
    sourceUrl: "https://www.roseira.sp.gov.br/pagina/18/vagas-de-emprego",
    requiredElements: ["Vaga", "Requisitos", "Contato", "Data de públicação"],
    columns: ["Vaga", "Requisitos", "Contato", "Situação"],
    rows: [["Vaga demonstrativa", "Não declarado", "Não declarado", "Aberta"]],
  },
  "divida-ativa": {
    title: "Dívida Ativa",
    subtitle: "Consulta, orientações, quitação e regularização de débitos inscritos em dívida ativa.",
    category: "Tributos",
    kind: "service",
    sourceLabel: "Portal da Transparência",
    sourceUrl: EXTERNAL_LINKS.transparencia,
    requiredElements: ["Consulta", "Quitação", "Parcelamento", "Contato fiscal"],
    columns: ["Serviço", "Descrição", "Canal"],
    rows: [["Quitação de Dívida Ativa", "Consulta e regularização", "Não declarado"]],
  },
  itbi: {
    title: "ITBI",
    subtitle: "Orientações para solicitação, cálculo, emissão e acompanhamento de ITBI.",
    category: "Tributos",
    kind: "service",
    requiredElements: ["Solicitação", "Documentos", "Cálculo", "Emissão de guia"],
    columns: ["Serviço", "Descrição", "Canal"],
    rows: [["ITBI", "Solicitação e emissão", "Não declarado"]],
  },
};

const NAVIGATION_REQUIREMENT_SLUGS: Record<string, string> = {
  "Prefeito e Vice-prefeito": "prefeito-vice",
  "Gabinete": "gabinete",
  "Estrutura Administrativa": "estrutura-administrativa",
  "Telefones e Endereços": "telefones-enderecos",
  "Horário de Atendimento": "horario-atendimento",
  "Símbolos Municipais": "símbolos-municipais",
  "Conselhos Municipais": "conselhos-municipais",
  "Mapa do Site": "mapa-site",
  "Galeria de Fotos": "galeria-fotos",
  "Termos de Uso": "termos-uso",
  "Política de Cookies": "politica-cookies",
  "LGPD": "lgpd",
  "Carta de Serviços": "carta-servicos",
  "Serviços ao Cidadão": "servicos-cidadao",
  "Serviços à Empresa": "servicos-empresa",
  "Serviços ao Servidor": "servicos-servidor",
  "Protocolos": "protocolos",
  "Emissão de Guias": "emissão-guias",
  "IPTU": "iptu",
  "Dívida Ativa": "divida-ativa",
  "ITBI": "itbi",
  "Nota Fiscal Eletrônica": "nota-fiscal-eletronica",
  "Cadastro de Inscrição Municipal": "cadastro-inscrição-municipal",
  "Bolsa Família": "bolsa-familia",
  "Banco do Povo": "banco-povo",
  "Acessa SP": "acessa-sp",
  "Conselho Tutelar": "conselho-tutelar",
  "Junta Militar": "junta-militar",
  "COVID-19": "covid",
  "Portal da Educação": "portal-educação",
  "Conselho Municipal de Educação": "conselho-educação",
  "Conselho de Alimentação Escolar": "conselho-alimentacao-escolar",
  "Vagas em Creche": "vagas-creche",
  "Educação - Página Temática": "educação-tematica",
  "Saúde - Página Temática": "saude-tematica",
  "Esporte - Página Temática": "esporte-tematica",
  "Turismo e Cultura": "turismo-cultura",
  "Meio Ambiente": "meio-ambiente",
  "Plano Municipal de Arborização Urbana": "plano-arborizacao",
  "Centro de Esterilização de Animais": "centro-esterilizacao",
  "Lei Aldir Blanc 2": "lei-aldir-blanc",
  "Vagas de Emprego": "vagas-emprego",
  "Agendamento": "agendamento",
  "Perguntas Frequentes": "faq",
  "Comunicados": "comunicados",
  "Agenda de Eventos": "eventos",
  "Campanhas": "campanhas",
  "Boletins Oficiais": "boletins-oficiais",
  "Dispensas e Inexigibilidades": "dispensas-inexigibilidades",
  "Concorrência Pública": "concorrencia-pública",
  "Chamada Pública": "chamada-pública",
  "Pregão Presencial": "pregao-presencial",
  "Tomada de Preços": "tomada-precos",
  "Leilão": "leilao",
  "Contratos": "contratos",
  "Aditivos": "aditivos",
  "Atas de Registro de Preços": "atas-registro-precos",
  "Fornecedores": "fornecedores",
  "PNCP": "pncp",
  "Portal da Transparência": "portal-transparencia",
  "Receitas": "receitas",
  "Despesas": "despesas",
  "Folha de Pagamento": "folha-pagamento",
  "Diárias e Passagens": "diarias-passagens",
  "Convênios e Repasses": "convenios-repasses",
  "Obras Públicas": "obras-públicas",
  "Audiências Públicas": "audiencias-públicas",
  "PPA, LDO e LOA": "ppa-ldo-loa",
  "RREO e RGF": "rreo-rgf",
  "Prestação de Contas": "prestacao-contas",
  "Parecer do Tribunal de Contas": "parecer-tce",
  "Dados Abertos": "dados-abertos",
  "Radar da Transparência / Matriz Atricon": "radar-transparencia",
  "Código Tributário": "codigo-tributario",
  "Plano Diretor": "plano-diretor",
  "Lei Orgânica Municipal": "lei-organica",
  "Diário Oficial": "diario-oficial",
  "Atos Oficiais": "atos-oficiais",
  "Ouvidoria": "ouvidoria",
  "e-SIC": "e-sic",
  "Endereço e Telefones": "endereco-telefones",
  "Horários de Atendimento": "horarios-atendimento-contato",
  "Mapa de Localização": "mapa-localizacao",
  "Redes Sociais": "redes-sociais",
};
const LEGISLACAO = [
  { num: "2036-2026", desc: "Horário de funcionamento durante jogos da Seleção - Copa 2026", date: "25/06/2026", status: "Ativo" },
  { num: "2035-2026", desc: "Utilidade pública e desapropriação de imóvel - SABESP/EEE", date: "19/06/2026", status: "Ativo" },
  { num: "2034-2026", desc: "Altera Decreto nº 1804 - regularização fundiária de interesse social", date: "19/06/2026", status: "Ativo" },
  { num: "2032-2026", desc: "Convocação para plenária municipal de saúde", date: "16/06/2026", status: "Ativo" },
  { num: "2031-2026", desc: "Regulamenta o Fundo Municipal de Saneamento (FMSAI)", date: "15/06/2026", status: "Ativo" },
  { num: "2029-2026", desc: "Prorrogação das validades do Concurso Público nº 01/2023", date: "13/06/2026", status: "Ativo" },
];
const DECRETOS = [
  { num: "1809-2026", desc: "Dispõe sobre expediente nas repartições públicas municipais em dias de jogos oficiais", date: "28/06/2026", status: "Ativo" },
  { num: "1808-2026", desc: "Regulamenta procedimentos administrativos para atendimento ao cidadão", date: "21/06/2026", status: "Ativo" },
  { num: "1807-2026", desc: "Declara ponto facultativo nas unidades administrativas municipais", date: "14/06/2026", status: "Ativo" },
  { num: "1806-2026", desc: "Nomeia membros para comissão de acompanhamento de políticas públicas", date: "05/06/2026", status: "Ativo" },
  { num: "1805-2026", desc: "Atualiza normas internas de funcionamento dos serviços municipais", date: "29/05/2026", status: "Ativo" },
  { num: "1804-2026", desc: "Institui medidas de regularização fundiária de interesse social", date: "18/05/2026", status: "Ativo" },
];
const PORTARIAS = [
  { num: "112-2026", desc: "Designa servidor para acompanhamento de contratos administrativos", date: "30/06/2026", status: "Ativo" },
  { num: "111-2026", desc: "Nomeia comissão responsável por análise de processos internos", date: "24/06/2026", status: "Ativo" },
  { num: "110-2026", desc: "Concede licença e providências funcionais a servidor municipal", date: "17/06/2026", status: "Ativo" },
  { num: "109-2026", desc: "Dispõe sobre escala de trabalho em setor administrativo", date: "10/06/2026", status: "Ativo" },
  { num: "108-2026", desc: "Designa fiscal para execução de serviço público municipal", date: "03/06/2026", status: "Ativo" },
  { num: "107-2026", desc: "Atualiza composição de equipe técnica para programas municipais", date: "27/05/2026", status: "Ativo" },
];
const DECRETOS_CONFIG: LegislacaoPageConfig = {
  pageTitle: "Decretos",
  pageSubtitle: "Consulte decretos municipais públicados pela Prefeitura Municipal de Roseira.",
  itemLabel: "Decreto",
  summaryLabel: "Decretos",
  activeSummaryLabel: "Decretos Ativos",
  extraSummaryLabel: "Publicações Recentes",
  extraSummaryTone: "yellow",
  searchAriaLabel: "Filtrar decretos",
  foundLabel: "decretos encontrados",
  detailInfoTitle: "Informações do Decreto",
  detailTitlePrefix: "Decreto Nº",
  relatedTitle: "Outros Decretos",
  documentLabel: "Decreto",
};
const PORTARIAS_CONFIG: LegislacaoPageConfig = {
  pageTitle: "Portarias",
  pageSubtitle: "Consulte portarias, nomeações e atos administrativos públicados pela Prefeitura Municipal de Roseira.",
  itemLabel: "Portaria",
  summaryLabel: "Portarias",
  activeSummaryLabel: "Portarias Ativas",
  extraSummaryLabel: "Atos Administrativos",
  extraSummaryTone: "yellow",
  searchAriaLabel: "Filtrar portarias",
  foundLabel: "portarias encontradas",
  detailInfoTitle: "Informações da Portaria",
  detailTitlePrefix: "Portaria Nº",
  relatedTitle: "Outras Portarias",
  documentLabel: "Portaria",
};
const LICITACOES = [
  { num: "23-2025", desc: "Manutenção preventiva e corretiva de veículos da frota municipal", date: "01/06/2026", status: "Encerrado" },
  { num: "32-2025", desc: "Aquisição de gêneros alimentícios para a merenda escolar", date: "03/03/2026", status: "Encerrado" },
  { num: "28-2025", desc: "Aquisição de medicamentos para a rede de saúde pública", date: "24/02/2026", status: "Encerrado" },
  { num: "22-2026", desc: "Fornecimento de areia, brita, pedrisco e bica corrida", date: "11/02/2026", status: "Encerrado" },
  { num: "20-2026", desc: "Aquisição de repelentes elétricos líquidos para saúde pública", date: "10/02/2026", status: "Encerrado" },
  { num: "15-2026", desc: "Serviços de roçagem e limpeza de vias públicas urbanas", date: "05/01/2026", status: "Ativo" },
];
const CONCURSOS = [
  { num: "1-2025", desc: "Processo Seletivo Simplificado nº 01/2025 - Área da Saúde", date: "02/03/2026", status: "Ativo" },
  { num: "1-2024", desc: "Processo Seletivo Simplificado nº 01/2024 - Educação e Assistência Social", date: "01/11/2024", status: "Ativo" },
  { num: "1-2023", desc: "Concurso Público nº 01/2023 - Cargos Efetivos", date: "23/10/2023", status: "Ativo" },
  { num: "1-2021", desc: "Processo Seletivo / Cadastro de Reserva 2021", date: "26/01/2021", status: "Ativo" },
  { num: "1-2019", desc: "Processo Seletivo - Conselho Tutelar (CMDCA)", date: "08/04/2019", status: "Ativo" },
  { num: "1-2017", desc: "Concurso Público Edital nº 001/2017", date: "19/11/2017", status: "Ativo" },
];

const NOTICIAS = [
  { cat: "Defesa Civil", catColor: "#c0392b", date: "05/08/2026", views: 65, title: "Base do Corpo de Bombeiros é inaugurada no município", desc: "Unidade vai ampliar a capacidade de resposta a emergências na região do Vale do Paraíba.", img: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=600&h=360&fit=crop&auto=format" },
  { cat: "Administração", catColor: "#1351B4", date: "31/07/2026", views: 54, title: "Parceria com Ministério das Mulheres oferece cursos gratuitos à população", desc: "Programa prevê capacitação em áreas como informática, costura e empreendedorismo feminino.", img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=600&h=360&fit=crop&auto=format" },
  { cat: "SEBRAE", catColor: "#FF6B00", date: "15/07/2026", views: 51, title: "Sebrae e Prefeitura firmam parceria para cursos práticos de negócios", desc: "Micro e pequenos empresários terão acesso gratuito a treinamentos em gestão e inovação.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=360&fit=crop&auto=format" },
  { cat: "Esportes", catColor: "#168821", date: "14/07/2026", views: 107, title: "Delegação municipal conquista medalhas nos Jogos Regionais 2026", desc: "Atletas de diversas modalidades representaram com brilhantismo o município nas competições.", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=360&fit=crop&auto=format" },
  { cat: "Esportes", catColor: "#168821", date: "01/07/2026", views: 113, title: "Fan Fest da Copa do Mundo reúne centenas de moradores na praça central", desc: "Evento contou com telão, apresentações culturais e distribuição gratuita de lanches.", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=360&fit=crop&auto=format" },
  { cat: "Administração", catColor: "#1351B4", date: "30/01/2026", views: 34987, title: "Convocação: Concurso Público e Processo Seletivo 2025 - candidatos devem se apresentar", desc: "A Prefeitura convoca aprovados para entrega de documentação e início do processo de admissão.", img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=360&fit=crop&auto=format" },
];

const ACESSO_CIDADAO = ["Portal da Transparência", "Bolsa Família", "Conselho Tutelar", "e-SUS", "Junta Militar", "Portal da Educação", "SIC - Acesso à Informação", "Covid-19", "Banco do Povo Paulista", "Educação"];
const ACESSO_EMPRESA = ["Cadastro de Inscrição Municipal", "ISS Online", "NFS-e", "Licitações", "Portal da Transparência", "Portal de Compras"];
const ACESSO_PRINCIPAIS = ["2ª Via IPTU / Taxas Imobiliárias", "Bolsa Família", "Cadastro Inscrição Municipal", "e-SUS", "ISS Online", "NFS-e", "Licitações", "Portal da Transparência", "RH Online", "SIC", "Veracidade do Holerite", "Ouvidoria Municipal"];

const HEADER_SOCIAL_LINKS = [
  { label: "Facebook", Icon: FaFacebookF },
  { label: "YouTube", Icon: FaYoutube },
  { label: "Instagram", Icon: FaInstagram },
];

const SECRETARIAS = [
  { nome: "Diretoria de Administração", diretor: "Isaac Pontes", horario: "08h às 17h", end: "Praça Sant'Ana, 201, Centro - Roseira/SP", tel: "Não declarado", email: "administracao@roseira.sp.gov.br" },
  { nome: "Diretoria de Cultura", diretor: "Wladimir Roberto Garcia de Paula Santos", horario: "08h às 17h", end: "Praça Sant'Ana, 201", tel: "(12) 3646-9900 / 202", email: "turismo@roseira.sp.gov.br" },
  { nome: "Diretoria de Esporte, Turismo e Lazer", diretor: "Zaneth de Sousa Miranda", horario: "08h às 17h", end: "R. Dep. Antônio Silvio Cunha Bueno - Nova Era", tel: "(12) 3646-3394", email: "secesportesroseira@gmail.com" },
  { nome: "Diretoria de Educação", diretor: "Leonaria Rodrigues de Sousa Corrêa", horario: "08h00 às 17h00", end: "Extensão da Praça Sant'Ana, 02 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "educação@roseira.sp.gov.br" },
  { nome: "Secretaria de Assistência Social", diretor: "Fabiana Caltabiano de Souza Siqueira", horario: "07h30 às 16h00", end: "Rua Cel. Rodophiano de Barros, 97 - Centro - Roseira/SP", tel: "Não declarado", email: "psroseira@yahoo.com.br" },
  { nome: "Diretoria de Finanças", diretor: "Luiz Carlos Rodrigues", horario: "8h às 17h", end: "Praça Sant'Ana, 201 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "lcarlos@roseira.sp.gov.br" },
];

export type Secretaria = {
  slug: string;
  nome: string;
  shortName: string;
  diretor: string;
  cargo: string;
  horario: string;
  end: string;
  tel: string;
  email: string;
  summary: string;
  sobre: string;
  competencias: string[];
};

const SECRETARIA_DETAILS: Secretaria[] = [
  { slug: "administracao", nome: "Diretoria de Administração", shortName: "Administração", diretor: "Isaac Pontes", cargo: "Diretor de Administração", horario: "08h às 17h", end: "Praça Sant'Ana, 201, Centro - Roseira/SP", tel: "Não declarado", email: "administracao@roseira.sp.gov.br", summary: "Coordena as rotinas administrativas, a gestão interna e o suporte às demais áreas da Prefeitura.", sobre: "A Diretoria de Administração organiza processos internos, documentos, patrimônio, compras administrativas e apoio aos setores municipais. Sua atuação busca garantir eficiência, transparência e continuidade aos serviços públicos.", competencias: ["Gestão de recursos humanos e folha de pagamento", "Administração de patrimônio público e bens móveis", "Compras, licitações e contratos administrativos", "Protocolo, arquivo e gestão documental", "Serviços de tecnologia da informação", "Gestão do diário oficial e públicações legais"] },
  { slug: "assistencia-social", nome: "Secretaria de Assistência Social", shortName: "Assistência Social", diretor: "Fabiana Caltabiano de Souza Siqueira", cargo: "Secretária de Assistência Social", horario: "07h30 às 16h00", end: "Rua Cel. Rodophiano de Barros, 97 - Centro - Roseira/SP", tel: "Não declarado", email: "psroseira@yahoo.com.br", summary: "Atende famílias, indivíduos e grupos em situação de vulnerabilidade social.", sobre: "A Secretaria de Assistência Social organiza serviços de proteção social, atendimento às famílias, programas de transferência de renda e acompanhamento de situações de vulnerabilidade.", competencias: ["Proteção social básica e especial", "Atendimento às famílias e indivíduos", "Gestão de benefícios e programas sociais", "Acompanhamento do Cadastro Único", "Articulação com conselhos e rede socioassistencial"] },
  { slug: "educação", nome: "Diretoria de Educação", shortName: "Educação", diretor: "Leonaria Rodrigues de Sousa Corrêa", cargo: "Diretora de Educação", horario: "08h00 às 17h00", end: "Extensão da Praça Sant'Ana, 02 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "educação@roseira.sp.gov.br", summary: "Coordena ações pedagógicas, administrativas e de apoio escolar na rede municipal.", sobre: "A Diretoria de Educação coordena ações pedagógicas, administrativas e de apoio escolar, buscando fortalecer a aprendizagem, a permanência dos alunos e a qualidade da rede municipal.", competencias: ["Gestão da rede municipal de ensino", "Acompanhamento pedagógico das escolas", "Transporte, merenda e apoio escolar", "Formação de profissionais da educação", "Atendimento às famílias e estudantes"] },
  { slug: "saude", nome: "Diretoria de Saúde", shortName: "Saúde", diretor: "João Bosco de Almeida Maia", cargo: "Diretor de Saúde", horario: "08h às 17h", end: "Roque Vieira da Silva Nº197", tel: "(12) 3646-1210", email: "sms@roseira.sp.gov.br", summary: "Organiza a atenção à saúde, os serviços municipais e as ações de prevenção.", sobre: "A Diretoria de Saúde planeja e acompanha os serviços de saúde do município, incluindo atendimento à população, programas preventivos, vigilância e suporte às unidades municipais.", competencias: ["Atenção básica e atendimento à população", "Programas de prevenção e promoção da saúde", "Vigilância em saúde", "Gestão das unidades e equipes municipais", "Acompanhamento de demandas e encaminhamentos"] },
  { slug: "obras-infraestrutura", nome: "Obras e Serviços Municipais", shortName: "Obras e Serviços", diretor: "Não declarado", cargo: "Responsável pela área", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Cuida da manutenção urbana, infraestrutura e serviços operacionais do município.", sobre: "A área de Obras e Serviços Municipais acompanha demandas de manutenção urbana, conservação de vias, infraestrutura pública e apoio operacional aos serviços municipais.", competencias: ["Manutenção de vias e espaços públicos", "Apoio a obras e infraestrutura", "Conservação urbana", "Serviços operacionais", "Atendimento de demandas da população"] },
  { slug: "esporte-turismo-lazer", nome: "Diretoria de Esporte, Turismo e Lazer", shortName: "Esporte, Turismo e Lazer", diretor: "Zaneth de Sousa Miranda", cargo: "Diretora de Esporte, Turismo e Lazer", horario: "08h às 17h", end: "R. Dep. Antônio Silvio Cunha Bueno - Nova Era", tel: "(12) 3646-3394", email: "secesportesroseira@gmail.com", summary: "Promove atividades esportivas, ações de turismo e iniciativas de lazer.", sobre: "A Diretoria de Esporte, Turismo e Lazer desenvolve atividades esportivas, eventos, programas de incentivo à prática física e ações de valorização turística e cultural do município.", competencias: ["Eventos esportivos e recreativos", "Apoio a equipes e atletas", "Promoção do turismo local", "Projetos de lazer comunitário", "Gestão de espaços esportivos"] },
  { slug: "financas", nome: "Diretoria de Finanças", shortName: "Finanças", diretor: "Luiz Carlos Rodrigues", cargo: "Diretor de Finanças", horario: "8h às 17h", end: "Praça Sant'Ana, 201 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "lcarlos@roseira.sp.gov.br", summary: "Coordena orçamento, receitas, despesas e controle financeiro municipal.", sobre: "A Diretoria de Finanças acompanha a gestão orçamentária, financeira e contábil do município, com foco no equilíbrio das contas públicas e no cumprimento das obrigações legais.", competencias: ["Gestão orçamentária e financeira", "Controle de receitas e despesas", "Acompanhamento contábil", "Planejamento fiscal", "Prestação de informações financeiras"] },
  { slug: "cultura", nome: "Diretoria de Cultura", shortName: "Cultura", diretor: "Wladimir Roberto Garcia de Paula Santos", cargo: "Diretor de Cultura", horario: "08h às 17h", end: "Praça Sant'Ana, 201", tel: "(12) 3646-9900 / 202", email: "turismo@roseira.sp.gov.br", summary: "Promove ações culturais, eventos e valorização da memória local.", sobre: "A Diretoria de Cultura organiza iniciativas culturais, eventos públicos e ações de valorização da identidade, da memória e da participação comunitária.", competencias: ["Promoção de eventos culturais", "Apoio a artistas e grupos locais", "Valorização da memória municipal", "Projetos de formação cultural", "Articulação de ações comunitárias"] },
];

const SECRETARIA_MENU_SLUGS: Record<string, string> = {
  "Administração": "administracao",
  "Assistência Social": "assistencia-social",
  "Educação": "educação",
  "Saúde": "saude",
  "Obras e Serviços Municipais": "obras-infraestrutura",
  "Agricultura e Meio Ambiente": "obras-infraestrutura",
  "Cultura, Esporte e Turismo": "esporte-turismo-lazer",
  "Fazenda / Finanças": "financas",
  Cultura: "cultura",
};

const SLIDER_ITEMS = [
  { title: "Base do Corpo de Bombeiros inaugurada", sub: "Defesa Civil - 05/08/2026", img: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=1200&h=500&fit=crop&auto=format" },
  { title: "Parceria com Ministério das Mulheres - cursos gratuitos", sub: "Administração - 31/07/2026", img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=1200&h=500&fit=crop&auto=format" },
  { title: "Delegação conquista medalhas nos Jogos Regionais 2026", sub: "Esportes - 14/07/2026", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=500&fit=crop&auto=format" },
  { title: "Fan Fest Copa do Mundo reúne centenas na praça central", sub: "Eventos - 01/07/2026", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=500&fit=crop&auto=format" },
];

const CALENDAR_EVENTS = [
  { day: "12", month: "AGO", title: "Audiência Pública - Plano Diretor Municipal", local: "Câmara Municipal" },
  { day: "15", month: "AGO", title: "Plenária de Saúde - Participação Popular", local: "Centro Cultural" },
  { day: "18", month: "AGO", title: "Dia do Servidor Público - Evento comemorativo", local: "Praça Central" },
  { day: "22", month: "AGO", title: "Abertura das inscrições - Concurso Cultural", local: "Online" },
  { day: "29", month: "AGO", title: "Prazo final - Isenção de IPTU 2025", local: "Prefeitura / Online" },
];

const GALERIA_FOTOS = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1560780448-fd139b7ba3fa?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1565832077366-f22d1a0dd598?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=280&fit=crop&auto=format",
];

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
const LANGS = [
  { name: "Português", flagSrc: "https://flagcdn.com/w40/br.png", flagAlt: "Bandeira do Brasil" },
  { name: "English", flagSrc: "https://flagcdn.com/w40/us.png", flagAlt: "Bandeira dos Estados Unidos" },
  { name: "Español", flagSrc: "https://flagcdn.com/w40/es.png", flagAlt: "Bandeira da Espanha" },
  { name: "Français", flagSrc: "https://flagcdn.com/w40/fr.png", flagAlt: "Bandeira da França" },
  { name: "Deutsch", flagSrc: "https://flagcdn.com/w40/de.png", flagAlt: "Bandeira da Alemanha" },
  { name: "Italiano", flagSrc: "https://flagcdn.com/w40/it.png", flagAlt: "Bandeira da Itália" },
];

function badgeToneClass(color: string) {
  if (color === "#c0392b") return "badge-red";
  if (color === "#1351B4") return "badge-blue";
  if (color === "#FF6B00") return "badge-orange";
  if (color === "#168821") return "badge-green";
  if (color === "#FFCD07") return "badge-yellow";
  return "badge-blue";
}

function quickPillClass(color: string) {
  if (color === "#168821") return "quick-pill-green";
  if (color === "#0C326F") return "quick-pill-navy";
  if (color === "#505C6D") return "quick-pill-gray";
  return "quick-pill-blue";
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`sx-0 ${badgeToneClass(color)}`}>
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const active = status === "Ativo";
  return (
    <span className={`sx-1 ${active ? "status-active" : "status-inactive"}`}>
      {status}
    </span>
  );
}

// -----------------------------------------------------------------------------
// ACCESSIBILITY BAR
// -----------------------------------------------------------------------------
function AccessBar({ fontSize, setFontSize }: { fontSize: number; setFontSize: (n: number) => void }) {
  const [lang, setLang] = useState("Português");
  const [showLang, setShowLang] = useState(false);
  const currentLang = LANGS.find(l => l.name === lang) ?? LANGS[0];

  return (
    <div  className="sx-2">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {I.clock}
            <span  className="sx-3">
              Seg. a Sex. das 8h às 17h
            </span>
          </div>
          <span  className="sx-4">|</span>
          <a href="#"  className="hover:text-white sx-5">Mapa do Site</a>
          <a href="#"  className="hover:text-white sx-6">Acesso à Informação (SIC)</a>
        </div>
        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Font size */}
          <div className="flex items-center gap-1">
            <span  className="sx-7">Fonte:</span>
            {[{ lbl: "A-", val: -1 }, { lbl: "A", val: 0 }, { lbl: "A+", val: 1 }].map(({ lbl, val }) => (
              <button
                key={lbl}
                onClick={() => setFontSize(val)}

               className={`sx-8 ${fontSize === val ? "font-button-active" : "font-button-muted"}`}>
                {lbl}
              </button>
            ))}
          </div>
          <span  className="sx-9">|</span>
          <button  className="sx-10">
            Alto Contraste
          </button>
          <button  className="sx-11">
            {I.accessible} VLibras
          </button>
          <button  className="sx-12">
            {I.qr} QR Code
          </button>
          <span  className="sx-13">|</span>
          {/* Language */}
          <div  className="sx-14">
            <button
              onClick={() => setShowLang(!showLang)}

             className="sx-15">
              <img className="language-flag-image" src={currentLang.flagSrc} alt={currentLang.flagAlt} />
              <span>{currentLang.name}</span>
              {I.chevDown}
            </button>
            {showLang && (
              <div  className="sx-16">
                {LANGS.map(l => (
                  <button key={l.name} onClick={() => { setLang(l.name); setShowLang(false); }}
                    className="gray-hover sx-17">

                    <img className="language-flag-image" src={l.flagSrc} alt={l.flagAlt} />
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Social */}
          <div className="social-icon-list">
            {HEADER_SOCIAL_LINKS.map(({ label, Icon }) => (
              <a key={label} href="#" aria-label={label} className="social-icon-link">
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------
function Header({ menuOpen, setMenuOpen, onNavigateHome }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void; onNavigateHome: () => void }) {
  return (
    <div  className="sx-19">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
        {/* Logo */}
        <button type="button" onClick={onNavigateHome} className="brand-home-link flex items-center gap-3 flex-shrink-0" aria-label="Ir para a página inicial">
          <div  className="sx-20">
            <img src="/prefeitura-de-roseira-logo.png" alt="Brasão da Prefeitura Municipal de Roseira" className="brand-logo" />
          </div>
          <div>
            <div  className="sx-21">Prefeitura Municipal</div>
            <div  className="sx-22">de Roseira - SP</div>
          </div>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Quick links (desktop) */}
        <div className="hidden lg:flex items-center gap-2 flex-wrap">
          {[
            { lbl: "Portal da Transparência", color: "#1351B4" },
            { lbl: "Ouvidoria", color: "#168821" },
            { lbl: "SIC", color: "#0C326F" },
            { lbl: "Webmail / Servidor", color: "#505C6D" },
          ].map(({ lbl, color }) => (
            <a key={lbl} href="#"

              className={`hover:opacity-80 sx-23 ${quickPillClass(color)}`}
            >
              {lbl} {I.ext}
            </a>
          ))}
        </div>

        {/* Weather */}
        <div className="hidden md:flex items-center gap-1.5 sx-24" >
          {I.sun}
          <span  className="sx-25">24°</span>
          <span  className="sx-26">/ 31°</span>
        </div>

        {/* Mobile hamburger */}
        <button type="button" className="lg:hidden sx-27" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
          {menuOpen ? I.close : I.menu}
        </button>
      </div>
    </div>
  );
}

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="sx-28">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="sx-29">
          <div className="sx-30" aria-hidden="true">{I.search}</div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Buscar no portal"
            placeholder="Buscar no portal - serviços, notícias, decretos, licitações..."
            className="sx-31"
          />
          <button type="button" className="sx-32">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------------------------
type AppPage = "home" | "historia-roseira" | "contato" | "concursos" | "licitacoes" | "licitacao-detail" | "leis-municipais" | "lei-detail" | "decretos" | "decreto-detail" | "portarias" | "portaria-detail" | "noticias" | "noticia-detail" | "secretarias" | "secretaria-detail" | "faq" | "requirement-page";

function NavBar({ menuOpen, setMenuOpen, currentPage, onNavigate, onOpenRequirement, onSelectSecretaria }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void; currentPage: AppPage; onNavigate: (page: AppPage) => void; onOpenRequirement: (slug: string) => void; onSelectSecretaria: (slug: string) => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenIdx(null);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const isActiveItem = (label: string) => {
    if (label === "Concursos") return currentPage === "concursos";
    if (label === "Licitações") return currentPage === "licitacoes" || currentPage === "licitacao-detail";
    if (label === "Notícias") return currentPage === "noticias" || currentPage === "noticia-detail";
    if (label === "Secretarias") return currentPage === "secretarias" || currentPage === "secretaria-detail";
    if (label === "Legislação") return currentPage === "leis-municipais" || currentPage === "lei-detail" || currentPage === "decretos" || currentPage === "decreto-detail" || currentPage === "portarias" || currentPage === "portaria-detail";
    if (label === "A Prefeitura") return currentPage === "historia-roseira";
    if (label === "Contato") return currentPage === "contato";
    if (label === "Serviços") return currentPage === "requirement-page" || currentPage === "faq";
    if (label === "Transparência") return currentPage === "requirement-page";
    return false;
  };

  return (
    <nav  ref={ref} className="sx-33">
      {/* Desktop */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.label} onMouseLeave={() => setOpenIdx(null)} className="sx-34">
              <button
                onMouseEnter={() => item.children.length ? setOpenIdx(idx) : setOpenIdx(null)}
                onClick={() => {
                  if (item.label === "Concursos") onNavigate("concursos");
                  if (item.label === "Licitações") onNavigate("licitacoes");
                  if (item.label === "Notícias") onNavigate("noticias");
                }}

                className={[openIdx === idx ? "bg-white/15" : "hover:bg-white/10", isActiveItem(item.label) ? "nav-item-active" : "", "sx-35"].filter(Boolean).join(" ")}
              >
                {item.label}
                {item.children.length > 0 && I.chevDown}
              </button>
              {openIdx === idx && item.children.length > 0 && (
                <div
                  onMouseLeave={() => setOpenIdx(null)}

                 className="sx-36">
                  {item.children.map(child => (
                    <a key={child} href="#"
                      onClick={(event) => {
                        const secretariaSlug = SECRETARIA_MENU_SLUGS[child];
                        if (item.label === "Secretarias" && secretariaSlug) {
                          event.preventDefault();
                          onSelectSecretaria(secretariaSlug);
                          setOpenIdx(null);
                        }
                        if (item.label === "Notícias" && child === "Últimas Notícias") {
                          event.preventDefault();
                          onNavigate("noticias");
                          setOpenIdx(null);
                        }
                        if (item.label === "Licitações") {
                          event.preventDefault();
                          onNavigate("licitacoes");
                          setOpenIdx(null);
                        }
                        if (item.label === "Legislação" && child === "Leis Municipais") {
                          event.preventDefault();
                          onNavigate("leis-municipais");
                          setOpenIdx(null);
                        }
                        if (item.label === "Legislação" && child === "Decretos") {
                          event.preventDefault();
                          onNavigate("decretos");
                          setOpenIdx(null);
                        }
                        if (item.label === "Legislação" && child === "Portarias") {
                          event.preventDefault();
                          onNavigate("portarias");
                          setOpenIdx(null);
                        }
                        if (item.label === "A Prefeitura" && child === "História de Roseira") {
                          event.preventDefault();
                          onNavigate("historia-roseira");
                          setOpenIdx(null);
                        }
                        if (item.label === "Contato" && child === "Fale Conosco") {
                          event.preventDefault();
                          onNavigate("contato");
                          setOpenIdx(null);
                        }
                        if (item.label === "Serviços" && child === "Perguntas Frequentes") {
                          event.preventDefault();
                          onNavigate("faq");
                          setOpenIdx(null);
                          return;
                        }
                        const requirementSlug = NAVIGATION_REQUIREMENT_SLUGS[child];
                        if (requirementSlug) {
                          event.preventDefault();
                          onOpenRequirement(requirementSlug);
                          setOpenIdx(null);
                        }
                      }}
                      className="gray-hover sx-37"
                    >
                      {child}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      {menuOpen && (
        <div  className="lg:hidden sx-38">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}  className="sx-39">
              <a
                href="#"
                onClick={(event) => {
                  if (item.label === "Concursos") {
                    event.preventDefault();
                    onNavigate("concursos");
                    setMenuOpen(false);
                  }
                  if (item.label === "Licitações") {
                    event.preventDefault();
                    onNavigate("licitacoes");
                    setMenuOpen(false);
                  }
                  if (item.label === "Notícias") {
                    event.preventDefault();
                    onNavigate("noticias");
                    setMenuOpen(false);
                  }
                  if (item.label === "Secretarias") {
                    event.preventDefault();
                    onNavigate("secretarias");
                    setMenuOpen(false);
                  }
                  if (item.label === "Legislação") {
                    event.preventDefault();
                    onNavigate("leis-municipais");
                    setMenuOpen(false);
                  }
                  if (item.label === "A Prefeitura") {
                    event.preventDefault();
                    onNavigate("historia-roseira");
                    setMenuOpen(false);
                  }
                  if (item.label === "Contato") {
                    event.preventDefault();
                    onNavigate("contato");
                    setMenuOpen(false);
                  }
                  const firstRequirement = item.children.map(child => NAVIGATION_REQUIREMENT_SLUGS[child]).find(Boolean);
                  if (firstRequirement) {
                    event.preventDefault();
                    onOpenRequirement(firstRequirement);
                    setMenuOpen(false);
                  }
                }}
                className="sx-40"
              >
                {item.label} {item.children.length > 0 && I.chevRight}
              </a>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

// -----------------------------------------------------------------------------
// ALERT BANNER
// -----------------------------------------------------------------------------
function AlertBanner() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div  className="sx-41">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span  className="sx-42">AVISO</span>
          <p  className="sx-43">
            <strong  className="sx-44">Prazo para isenção de IPTU 2025</strong> - Contribuintes podem solicitar isenção até 31 de agosto.{" "}
            <a href="#"  className="sx-45">Clique aqui para saber mais</a>
          </p>
        </div>
        <button type="button" onClick={() => setShow(false)} aria-label="Fechar aviso" className="sx-46">{I.close}</button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// HERO SLIDER
// -----------------------------------------------------------------------------
function HeroSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDER_ITEMS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="sx-47" aria-label="Destaques">
      <div className="hero-track" style={{ transform: `translate3d(-${idx * (100 / SLIDER_ITEMS.length)}%, 0, 0)` }}>
        {SLIDER_ITEMS.map(item => (
          <article key={item.title} className="hero-slide">
            <img src={item.img} alt={item.title} className="sx-48" />
            <div className="sx-49" />
            <div className="sx-50">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="sx-51">
                  <Badge label={item.sub} color="#FFCD07" />
                  <h1 className="sx-52">{item.title}</h1>
                  <a href="#" className="sx-53">
                    Leia mais {I.chevRight}
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* Dots */}
      <div  className="sx-54" aria-label="Selecionar destaque">
        {SLIDER_ITEMS.map((_, i) => (
          <button key={i} type="button" onClick={() => setIdx(i)} aria-label={`Ir para destaque ${i + 1}`} aria-current={i === idx ? "true" : undefined}

           className={`sx-55 carousel-dot ${i === idx ? "carousel-dot-active" : "carousel-dot-idle"}`}/>
        ))}
      </div>
      {/* Arrows */}
      <button type="button" aria-label="Destaque anterior" onClick={() => setIdx(i => (i - 1 + SLIDER_ITEMS.length) % SLIDER_ITEMS.length)}
         className="sx-56 carousel-arrow">
        {I.chevLeft}
      </button>
      <button type="button" aria-label="Próximo destaque" onClick={() => setIdx(i => (i + 1) % SLIDER_ITEMS.length)}
         className="sx-57 carousel-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </section>
  );
}

// -----------------------------------------------------------------------------
// ACESSO RÁPIDO
// -----------------------------------------------------------------------------
function AcessoRapido() {
  const [tab, setTab] = useState<"cidadao" | "empresa" | "principais">("cidadao");
  const lists = { cidadao: ACESSO_CIDADAO, empresa: ACESSO_EMPRESA, principais: ACESSO_PRINCIPAIS };
  const filtered = lists[tab];

  return (
    <section  className="py-10 sx-58">
      <div className="max-w-7xl mx-auto px-4">
        <div className="quick-access-heading">
          <div  className="sx-59">
            <p  className="sx-60">Portal</p>
            <h2  className="sx-61 section-title">Acesso Rápido</h2>
          </div>
          {/* Tabs */}
          <div className="quick-access-tabs" role="tablist" aria-label="Categorias de acesso rápido">
            {([["cidadao", "Cidadão"], ["empresa", "Empresa"], ["principais", "Principais Serviços"]] as const).map(([k, lbl]) => (
              <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                 className={`sx-66 ${tab === k ? "tab-pill-active" : "tab-pill-idle"}`}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="quick-service-grid">
          {filtered.map(s => (
            <a key={s} href="#"

              className="sx-67 quick-service-card">
              <span className="quick-service-title">{s}</span>
              <span className="quick-service-action" aria-hidden="true">{I.chevRight}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// ÚLTIMAS PUBLICAÇÍES (tabs)
// -----------------------------------------------------------------------------
function Publicacoes() {
  const [tab, setTab] = useState<"leg" | "lic" | "con">("leg");
  const data = { leg: LEGISLACAO, lic: LICITACOES, con: CONCURSOS };
  const labels = { leg: "Legislação", lic: "Licitações", con: "Concursos" };
  const rows = data[tab];

  return (
    <section  className="py-14 sx-68">
      <div className="max-w-7xl mx-auto px-4">
        <div className="publicacoes-heading">
          <div>
            <p  className="sx-69">Publicações</p>
            <h2  className="sx-70 section-title">Últimas Publicações Oficiais</h2>
          </div>
          <div  className="sx-71 publicacoes-tabs" role="tablist" aria-label="Categorias de publicações oficiais">
            {(["leg", "lic", "con"] as const).map(k => (
              <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                 className={`sx-72 ${tab === k ? "tab-pill-active" : "tab-pill-idle"}`}>
                {labels[k]}
              </button>
            ))}
          </div>
        </div>
        <div  className="sx-73">
          <table  className="sx-74">
            <thead>
              <tr  className="sx-75">
                <th  className="sx-76">Nº</th>
                <th  className="sx-77">Descrição</th>
                <th  className="sx-78">Data</th>
                <th  className="sx-79">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.num}  className="gray-hover-row sx-80">
                  <td  className="sx-81">
                    <a href="#"  className="sx-82">{r.num}</a>
                  </td>
                  <td  className="sx-83">
                    <a href="#"  className="gray-hover-text sx-84">{r.desc}</a>
                  </td>
                  <td  className="sx-85">{r.date}</td>
                  <td  className="sx-86"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <a href="#"  className="more-link">
            Ver mais {labels[tab]} {I.chevRight}
          </a>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// NOTÍCIAS
// -----------------------------------------------------------------------------
function Noticias({ onSelectNoticia, onOpenNoticias }: { onSelectNoticia: (index: number) => void; onOpenNoticias: () => void }) {
  const [idx, setIdx] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const [paused, setPaused] = useState(false);
  const newsTrack = Array.from({ length: 12 }, (_, offset) => NOTICIAS[offset % NOTICIAS.length]);
  const loopPoint = Math.max(1, newsTrack.length - 3);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setIdx(i => i + 1), 5000);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    if (idx < loopPoint) return;
    const t = window.setTimeout(() => {
      setTransitionOn(false);
      setIdx(0);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setTransitionOn(true)));
    }, 520);
    return () => window.clearTimeout(t);
  }, [idx, loopPoint]);

  const nextNews = () => setIdx(i => Math.min(i + 1, loopPoint));
  const prevNews = () => {
    if (idx > 0) {
      setIdx(i => i - 1);
      return;
    }
    setTransitionOn(false);
    setIdx(loopPoint - 1);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      setTransitionOn(true);
      setIdx(loopPoint - 2);
    }));
  };

  return (
    <section  className="py-14 sx-88">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p  className="sx-89">Comunicação</p>
            <h2  className="sx-90 section-title">Notícias</h2>
          </div>
        </div>
        <div className="news-carousel">
          <button type="button" onClick={prevNews} className="news-carousel-nav news-carousel-prev carousel-arrow" aria-label="Notícia anterior">
            {I.chevLeft}
          </button>
          <div className="news-carousel-viewport">
            <div
              className={`news-carousel-grid ${transitionOn ? "" : "news-carousel-no-transition"}`}
              style={{ "--news-index": idx } as React.CSSProperties}
            >
          {newsTrack.map((n, i) => (
            <button key={`${n.title}-${i}`} type="button" onClick={() => onSelectNoticia(i % NOTICIAS.length)}

              className="hover:shadow-lg hover:-translate-y-1 group sx-92">
              <div  className="sx-93">
                <img src={n.img} alt={n.title}  className="group-hover:scale-105 sx-94" />
              </div>
              <div  className="sx-95">
                <div className="flex items-center gap-2 mb-3">
                  <Badge label={n.cat} color={n.catColor} />
                  <span  className="sx-96">{n.date}</span>
                  <span  className="sx-97">
                    {I.eye} {n.views.toLocaleString("pt-BR")}
                  </span>
                </div>
                <h3  className="sx-98">{n.title}</h3>
                <p  className="sx-99">{n.desc}</p>
                <div  className="sx-100">
                  Ler mais {I.chevRight}
                </div>
              </div>
            </button>
          ))}
            </div>
          </div>
          <button type="button" onClick={nextNews} className="news-carousel-nav news-carousel-next carousel-arrow" aria-label="Próximas notícias">
            {I.chevRight}
          </button>
        </div>
        <div className="news-carousel-dots" aria-label="Páginas do carrossel de notícias">
          {Array.from({ length: loopPoint }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`carousel-dot ${i === idx % loopPoint ? "carousel-dot-active" : "carousel-dot-idle"}`}
              aria-label={`Ir para página de notícias ${i + 1}`}
              aria-current={i === idx % loopPoint ? "true" : undefined}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <button type="button" onClick={onOpenNoticias} className="sx-101 more-link">
            Ver mais notícias {I.chevRight}
          </button>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// GALERIA MULTIMÍDIA
// -----------------------------------------------------------------------------
function Galeria() {
  const [tab, setTab] = useState<"fotos" | "videos">("fotos");

  return (
    <section  className="py-14 sx-102">
      <div className="max-w-7xl mx-auto px-4">
        <div className="galeria-heading">
          <div>
            <p  className="sx-103">Multimídia</p>
            <h2  className="sx-104 section-title">Galeria de Fotos e Vídeos</h2>
          </div>
          <div className="galeria-tabs" role="tablist" aria-label="Tipo de mídia da galeria">
            <button type="button" role="tab" aria-selected={tab === "fotos"} onClick={() => setTab("fotos")} className={`sx-72 ${tab === "fotos" ? "tab-pill-active" : "tab-pill-idle"}`}>
              Fotos
            </button>
            <button type="button" role="tab" aria-selected={tab === "videos"} onClick={() => setTab("videos")} className={`sx-72 ${tab === "videos" ? "tab-pill-active" : "tab-pill-idle"}`}>
              Vídeos
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALERIA_FOTOS.map((src, i) => (
            <div key={i}  className="group cursor-pointer sx-107">
              <img src={src} alt={`Galeria ${i + 1}`}  className="group-hover:scale-105 sx-108" />
              <div  className="group-hover:bg-gray-100 flex items-center justify-center sx-109">
                <div  className="group-hover:opacity-100 sx-110">{I.photo}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 flex gap-3 justify-center">
          <a href="#"  className="more-link">
            {I.photo} Ver Galeria de Fotos
          </a>
          <a href="#"  className="more-link">
            {I.video} Ver Galeria de Vídeos
          </a>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// SECRETARIAS
// -----------------------------------------------------------------------------
function Secretarias({ onSelectSecretaria, onOpenDirectory }: { onSelectSecretaria: (slug: string) => void; onOpenDirectory: () => void }) {
  const [idx, setIdx] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const [paused, setPaused] = useState(false);
  const secretariasTrack = Array.from({ length: 12 }, (_, offset) => SECRETARIA_DETAILS[offset % SECRETARIA_DETAILS.length]);
  const loopPoint = Math.max(1, secretariasTrack.length - 4);
  const activeDot = idx % SECRETARIA_DETAILS.length;

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setIdx(i => i + 1), 5000);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    if (idx < loopPoint) return;
    const t = window.setTimeout(() => {
      setTransitionOn(false);
      setIdx(0);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setTransitionOn(true)));
    }, 620);
    return () => window.clearTimeout(t);
  }, [idx, loopPoint]);

  const nextPage = () => setIdx(i => Math.min(i + 1, loopPoint));
  const prevPage = () => {
    if (idx > 0) {
      setIdx(i => i - 1);
      return;
    }
    setTransitionOn(false);
    setIdx(loopPoint - 1);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      setTransitionOn(true);
      setIdx(loopPoint - 2);
    }));
  };
  const initials = (name: string) => name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("");

  return (
    <section className="py-14 sx-113">
      <div className="max-w-7xl mx-auto px-4">
        <div className="secretarias-header">
          <div>
            <p className="sx-114">Organização</p>
            <h2 className="sx-115 section-title">Secretarias Municipais</h2>
          </div>
        </div>
        <div className="secretarias-carousel">
          <button type="button" onClick={prevPage} className="secretarias-nav secretarias-nav-left carousel-arrow" aria-label="Secretarias anteriores">
            {I.chevLeft}
          </button>
          <div className="secretarias-viewport">
            <div
              className={`secretarias-grid ${transitionOn ? "" : "secretarias-no-transition"}`}
              style={{ "--secretarias-index": idx } as React.CSSProperties}
            >
            {secretariasTrack.map((s, i) => (
              <article key={`${s.nome}-${i}`} className="secretaria-card">
                <div className="secretaria-card-top">
                  <div className="secretaria-avatar">{initials(s.diretor)}</div>
                </div>
                <div className="secretaria-card-body">
                  <h3>{s.nome}</h3>
                  <div className="secretaria-info-list">
                    <p><span aria-hidden="true">•</span>{s.diretor}</p>
                    <p><span aria-hidden="true">{I.clock}</span>{s.horario}</p>
                    <p><span aria-hidden="true">{I.map}</span>{s.end}</p>
                    <p><span aria-hidden="true">{I.phone}</span><a href={`tel:${s.tel}`}>{s.tel}</a></p>
                    <p><span aria-hidden="true">{I.mail}</span><a href={`mailto:${s.email}`}>{s.email}</a></p>
                  </div>
                  <button type="button" onClick={() => onSelectSecretaria(s.slug)} className="secretaria-profile more-link">
                    Ver perfil
                  </button>
                </div>
              </article>
            ))}
            </div>
          </div>
          <button type="button" onClick={nextPage} className="secretarias-nav secretarias-nav-right carousel-arrow" aria-label="Próximas secretarias">
            {I.chevRight}
          </button>
        </div>
        <div className="secretarias-dots" aria-label="Páginas do carrossel de secretarias">
          {SECRETARIA_DETAILS.map((_, i) => (
            <button key={i} type="button" onClick={() => setIdx(i)} className={`carousel-dot ${i === activeDot ? "carousel-dot-active" : "carousel-dot-idle"}`} aria-label={`Ir para secretaria ${i + 1}`} />
          ))}
        </div>
        <div className="text-center mt-6">
          <button type="button" onClick={onOpenDirectory} className="more-link">
            Ver mais secretarias {I.chevRight}
          </button>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// CALENDÁRIO DE EVENTOS
// -----------------------------------------------------------------------------
function CalendarioEventos() {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const [month, setMonth] = useState(7); // August (0-indexed)

  return (
    <section  className="py-14 sx-132">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Calendar widget */}
          <div>
            <p  className="sx-133">Agenda</p>
            <h2  className="sx-134 section-title">Calendário de Eventos</h2>

            {/* Month selector */}
            <div  className="sx-135">
              <button onClick={() => setMonth(m => Math.max(0, m - 1))}  className="sx-136">
                {I.chevLeft}
              </button>
              <span  className="sx-137">{months[month]} 2026</span>
              <button onClick={() => setMonth(m => Math.min(11, m + 1))}  className="sx-138">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>

            {/* Days grid */}
            <div  className="sx-139">
              <div  className="sx-140">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
                  <div key={i}  className="sx-141">{d}</div>
                ))}
              </div>
              <div  className="sx-142">
                {/* Offset for August 2026 (Saturday = 6) */}
                {Array.from({ length: 6 }).map((_, i) => <div key={"e" + i} />)}
                {Array.from({ length: 31 }).map((_, i) => {
                  const d = i + 1;
                  const hasEvent = [12, 15, 18, 22, 29].includes(d);
                  const today = d === 10;
                  return (
                    <div key={d}  className={`sx-143 ${today ? "calendar-day-today" : hasEvent ? "calendar-day-event" : "calendar-day-normal"}`}>
                      {d}
                      {hasEvent && !today && <div   className="sx-144"/>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events list */}
          <div>
            <p  className="sx-145">Próximos</p>
            <h2  className="sx-146 section-title">Eventos em Agosto</h2>
            <div className="space-y-3">
              {CALENDAR_EVENTS.map((ev) => (
                <a key={ev.day} href="#"  className="gray-hover-card sx-147">
                  <div  className="sx-148">
                    <span  className="sx-149">{ev.day}</span>
                    <span  className="sx-150">{ev.month}</span>
                  </div>
                  <div>
                    <div  className="sx-151">{ev.title}</div>
                    <div  className="sx-152">
                      {I.map} {ev.local}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <a href="#" className="more-link calendar-more-link">
          Ver todos os eventos {I.chevRight}
        </a>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// TRANSPARÚNCIA
// -----------------------------------------------------------------------------
function Transparencia() {
  const items = [
    { lbl: "Portal da Transparência", desc: "Receitas, despesas e contratos públicos", Icon: ShieldCheck },
    { lbl: "Contas Públicas", desc: "Balanços e relatórios de execução orçamentária", Icon: Landmark },
    { lbl: "Licitações e Contratos", desc: "Editais, resultados e atas de sessão", Icon: FileText },
    { lbl: "Lei de Acesso à Informação", desc: "Solicite informações via e-SIC", Icon: Info },
    { lbl: "Diário Oficial", desc: "Atos e públicações da administração", Icon: Newspaper },
    { lbl: "Audiências Públicas", desc: "Pautas, atas e transmissões ao vivo", Icon: UsersRound },
  ];

  return (
    <section  className="py-14 sx-153">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p  className="sx-154">Gestão Pública</p>
          <h2  className="sx-155 section-title">Transparência e Acesso à Informação</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ Icon, ...it }) => (
            <a key={it.lbl} href="#"

              className="sx-156 transparency-card">
              <div  className="sx-157">
                <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <div  className="sx-158">{it.lbl}</div>
              <div  className="sx-159">{it.desc}</div>
              <div className="sx-160 more-link transparency-access-link">
                Acessar {I.chevRight}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// REDES SOCIAIS + NEWSLETTER
// -----------------------------------------------------------------------------
function SocialNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section  className="py-14 sx-161">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p  className="sx-162">Comunicação</p>
            <h2  className="sx-163 section-title">Acompanhe-nos nas redes</h2>
            <p  className="sx-164">
              Fique por dentro das ações, eventos e serviços da Prefeitura pelas nossas redes sociais oficiais.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: I.fb, label: "Facebook", handle: "Prefeitura Municipal de Roseira" },
                { icon: I.ig, label: "Instagram", handle: "Prefeitura Municipal de Roseira" },
                { icon: I.yt, label: "YouTube", handle: "TV Prefeitura" },
                { icon: I.msg, label: "Messenger", handle: "Messenger Oficial" },
              ].map(s => (
                <a key={s.label} href="#"

                  className="hover:shadow-md hover:border-gray-300 sx-165">
                  <span className="social-icon-link">{s.icon}</span>
                  <div>
                    <div  className="sx-167">{s.label}</div>
                    <div  className="sx-168">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div  className="sx-169">
            <h3  className="sx-163 section-title">Newsletter Municipal</h3>
            <p  className="sx-171">
              Receba as principais notícias e avisos da Prefeitura diretamente no seu e-mail.
            </p>
            {sent ? (
              <div  className="sx-172">
                <p  className="sx-173">OK: Inscrição realizada com sucesso!</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSent(true); }}>
                <div  className="sx-174">
                  <label htmlFor="newsletter-email" className="sx-175">Seu e-mail</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"

                   className="sx-176"/>
                </div>
                <div  className="sx-177">
                  <input type="checkbox" id="captcha"   className="sx-178"/>
                  <label htmlFor="captcha"  className="sx-179">Não sou um robô</label>
                  <span  className="sx-180">Seguro</span>
                </div>
                <button type="submit"
                   className="sx-181 button-yellow">
                  Cadastrar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// MAPA TURÍSTICO
// -----------------------------------------------------------------------------
const TOURISM_POINTS = [
  {
    name: "Estação Ferroviária de Roseira",
    description: "Marco ligado à formação urbana do município e à história da Estrada de Ferro Central do Brasil no Vale do Paraíba.",
    address: "Linha férrea - Roseira/SP",
    image: "https://www.estacoesferroviarias.com.br/r/fotos/roseira0151.jpg",
    x: 10.8,
    y: 58.5,
  },
  {
    name: "Espaço Arte, Cultura e Turismo Ana Cláudia Giovanelli Fázzeri",
    description: "Antigo espaço ferroviário revitalizado para abrigar atividades culturais, turismo e memória roseirense.",
    address: "Área central, junto à linha férrea",
    image: "https://www.roseira.sp.gov.br/public/admin/globalarq/uploads/files/IMG_3925.JPG",
    x: 23.4,
    y: 38.8,
  },
  {
    name: "Igreja Matriz de Sant'Ana",
    description: "Principal templo católico da cidade e referência histórica, cultural e religiosa no centro de Roseira.",
    address: "Praça Sant'Ana, 446 - Centro",
    image: "https://chaocaipira.org.br/wp-content/uploads/2024/10/igreja-matriz-roseira.jpg",
    x: 32.4,
    y: 76.2,
  },
  {
    name: "Mosteiro da Sagrada Face",
    description: "Santuário religioso em estilo medieval, integrado à Rota da Fé e reconhecido como um dos principais atrativos turísticos de Roseira.",
    address: "Estrada dos Oblatos, 1 - Pindaitiba",
    image: "https://www.roseira.sp.gov.br/admin/globalarq/noticia/noticia/651_366/ce43c18f7f09b2e8eb19eb78acb85c01.jpeg",
    x: 43.4,
    y: 52,
  },
  {
    name: "Paço Municipal de Roseira",
    description: "Sede da administração municipal e ponto de referência cívica no centro da cidade.",
    address: "Praça Sant'Ana, 201 - Centro",
    image: "https://www.roseira.sp.gov.br/admin/globalarq/noticia/noticia/651_366/cf55a1f50949a2bec2c8996f18f0a62a.png",
    x: 60.4,
    y: 53.2,
  },
  {
    name: "Igreja de Nossa Senhora da Piedade",
    description: "Igreja histórica localizada em Roseira Velha, ligada às origens religiosas e culturais do município.",
    address: "Rua Olegário de Paula - Roseira Velha",
    image: "https://images.mnstatic.com/e5/de/e5deadf0bac3a5050518869de2670e52.jpg",
    x: 79.3,
    y: 52,
  },
  {
    name: "Praça da Matriz",
    description: "Praça arborizada em frente à Matriz, com bancos, sombra e espaços de convivência para moradores e visitantes.",
    address: "Centro de Roseira/SP",
    image: "https://images.mnstatic.com/51/5a/515ab4364bfb570cc7b1d32cb10160ef.jpg?aspect_ratio=980%3A880&fit=crop&format=png&height=880&quality=75&width=980",
    x: 74.6,
    y: 77,
  },
  {
    name: "Caminho Velho da Estrada Real",
    description: "Roseira integra o Caminho Velho da Estrada Real, rota histórica que valoriza natureza, cultura, religiosidade e cicloturismo.",
    address: "Roseira/SP",
    image: "https://www.roseira.sp.gov.br/admin/globalarq/noticia/noticia/651_366/cc320d7a91af56685a8489a86920a622.webp",
    x: 92.6,
    y: 57.4,
  },
];

function MapaTuristico() {
  const [activePoint, setActivePoint] = useState<(typeof TOURISM_POINTS)[number] | null>(null);

  return (
    <section className="tourism-map-section" aria-labelledby="tourism-map-title">
      <div className="max-w-7xl mx-auto px-4">
        <div className="tourism-map-header">
          <div className="tourism-map-heading">
            <p className="site-caps-title">Pontos Turísticos</p>
            <h2 id="tourism-map-title" className="site-section-title">Mapa turístico de Roseira</h2>
            <p className="site-subtitle-text">
              Explore os principais pontos turísticos e locais de interesse da cidade de Roseira.
            </p>
          </div>
          <div className="tourism-map-cta">
            <span className="site-card-title">Interaja com o mapa</span>
            <span className="site-text">Clique nos pontos turísticos para explorar a cidade.</span>
          </div>
        </div>
      </div>
      <div className="tourism-map-full">
        <div className="tourism-map-card" aria-label="Mapa turístico interativo de Roseira">
          <img src="/mapa-cidade-de-roseira.png" alt="Mapa turístico da cidade de Roseira" />
          {TOURISM_POINTS.map((point) => (
            <button
              key={point.name}
              type="button"
              className={`tourism-map-point ${activePoint?.name === point.name ? "tourism-map-point-active" : ""}`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onClick={() => setActivePoint(point)}
              aria-label={`Ver informações sobre ${point.name}`}
            >
              <span />
            </button>
          ))}
          {activePoint && (
            <article className="tourism-map-info-card" aria-live="polite">
              <button type="button" className="tourism-map-close" onClick={() => setActivePoint(null)} aria-label="Fechar informações">
                ×
              </button>
              <div className="tourism-map-info-content">
                <h3 className="site-card-title">{activePoint.name}</h3>
                <p className="site-text">{activePoint.description}</p>
                <div className="tourism-map-address">
                  {I.map}
                  <span>{activePoint.address}</span>
                </div>
                <div className="tourism-map-actions">
                  <a href="#" className="site-action-button button-yellow">Como chegar</a>
                  <a href="#" className="site-action-button-muted">Compartilhar</a>
                </div>
              </div>
              <img src={activePoint.image} alt={activePoint.name} />
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// FALE CONOSCO
// -----------------------------------------------------------------------------
function FaleConosco() {
  return (
    <section  className="py-14 sx-182">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div>
            <p  className="sx-183">Contato</p>
            <h2  className="sx-184 section-title">Fale com a Prefeitura</h2>
            <div className="space-y-4 mb-8">
              {[
                { icon: I.phone, label: "Central de Atendimento", val: "(12) 3646-9900" },
                { icon: I.mail, label: "E-mail institucional", val: "contato@roseira.sp.gov.br" },
                { icon: I.map, label: "Endereço", val: "Praça Sant'Ana, 201, Centro - Roseira/SP - CEP 12580-017" },
                { icon: I.clock, label: "Horário de atendimento", val: "Segunda a Sexta, das 8h às 17h" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div  className="sx-185">{icon}</div>
                  <div>
                    <div  className="sx-186">{label}</div>
                    <div  className="sx-187">{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { lbl: "Carta de Serviço ao Cidadão", color: "#1351B4" },
                { lbl: "SIC - Acesso à Informação", color: "#0C326F" },
                { lbl: "Ouvidoria Municipal", color: "#168821" },
                { lbl: "Perguntas Frequentes", color: "#505C6D" },
              ].map(({ lbl, color }) => (
                <a key={lbl} href="#"

                  className="hover:opacity-80 sx-188">
                  {lbl} {I.ext}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div  className="sx-189">
            <h3  className="sx-190">Enviar mensagem</h3>
            <div className="space-y-4">
              {[
                { id: "contact-name", lbl: "Nome completo", type: "text", ph: "João da Silva", autoComplete: "name" },
                { id: "contact-email", lbl: "E-mail", type: "email", ph: "joao@email.com", autoComplete: "email" },
                { id: "contact-phone", lbl: "Telefone", type: "tel", ph: "(12) 99999-9999", autoComplete: "tel" },
                { id: "contact-cpf", lbl: "CPF", type: "text", ph: "000.000.000-00", autoComplete: "off" },
              ].map(f => (
                <div key={f.lbl}>
                  <label htmlFor={f.id} className="sx-191">{f.lbl}</label>
                  <input id={f.id} type={f.type} placeholder={f.ph} autoComplete={f.autoComplete} className="sx-192"/>
                </div>
              ))}
              <div>
                <label htmlFor="contact-subject" className="sx-193">Assunto</label>
                <select id="contact-subject" className="sx-194">
                  <option value="">Selecione um assunto</option>
                  <option>IPTU e Tributos</option><option>Obras e Licenças</option><option>Saúde</option><option>Educação</option><option>Esporte e Lazer</option><option>Meio Ambiente</option><option>Assistência Social</option><option>Outro</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="sx-195">Mensagem</label>
                <textarea id="contact-message" rows={4} placeholder="Descreva sua solicitação..." className="sx-196"/>
              </div>
              <button type="button" className="sx-197 button-yellow">
                Enviar mensagem
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const COLS = [
    { title: "A Prefeitura", links: ["História do Município", "Galeria de Prefeitos", "Estrutura Organizacional", "Secretarias Municipais", "Câmara Municipal", "Plano Diretor"] },
    { title: "Serviços Online", links: ["2ª Via IPTU / Taxas", "Quitação Dívida Ativa", "ITBI", "NFS-e", "ISS Online", "RH Online", "Veracidade do Holerite", "Acessa SP"] },
    { title: "Cidadão", links: ["Portal da Transparência", "SIC - Acesso à Informação", "Ouvidoria Municipal", "Bolsa Família", "Banco do Povo Paulista", "Conselho Tutelar", "Junta Militar"] },
    { title: "Empresa", links: ["Cadastro Inscrição Municipal", "ISS Online", "NFS-e", "Licitações", "Portal de Compras", "Sebrae"] },
  ];

  return (
    <footer  className="pt-14 pb-4 sx-198">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div  className="sx-199">
                <img src="/prefeitura-de-roseira-logo.png" alt="Brasão da Prefeitura Municipal de Roseira" className="footer-logo" />
              </div>
              <div>
                <div  className="sx-200">Prefeitura Municipal</div>
                <div  className="sx-201">de Roseira - SP</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { icon: I.clock, val: "De segunda a sexta, das 8h às 17h" },
                { icon: I.map, val: "Praça Sant'Ana, 201, Centro - CEP: 12580-017" },
                { icon: I.phone, val: "(12) 3646-9900" },
                { icon: I.mail, val: "contato@roseira.sp.gov.br" },
              ].map(({ icon, val }) => (
                <div key={val} className="flex gap-2 items-start">
                  <span  className="sx-202">{icon}</span>
                  <span  className="sx-203">{val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              {[
                { icon: I.fb, label: "Facebook" },
                { icon: I.ig, label: "Instagram" },
                { icon: I.yt, label: "YouTube" },
                { icon: I.msg, label: "Messenger" },
              ].map((s, i) => (
                <a key={i} href="#" aria-label={s.label} className="social-icon-link">{s.icon}</a>
              ))}
            </div>
            <a href="#"  className="hover:text-white sx-205">
              {I.map} Ver Localização
            </a>
            <a href="#"  className="hover:text-white sx-206">
              ✉ Webmail / Portal do Servidor
            </a>
          </div>

          {COLS.map(({ title, links }) => (
            <div key={title}>
              <h4  className="sx-207">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l}>
                    <a href="#"  className="hover:text-white sx-208">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div  className="sx-209">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p  className="sx-210">
                CNPJ: 45.212.008/0001-50 - Copyright {new Date().getFullYear()} - Prefeitura Municipal de Roseira - SP. Todos os direitos reservados.
              </p>
              <p  className="sx-211">
                Versão do sistema: 2.0.0 · Portal atualizado em: {new Date().toLocaleDateString("pt-BR")} · Gerenciado pelo Departamento de TI
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Termos e Condições de Uso", "Políticas de Cookies", "LGPD - Proteção de Dados", "Mapa do Site"].map(l => (
                <a key={l} href="#"  className="hover:text-white/60 sx-212">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// COOKIE BANNER
// -----------------------------------------------------------------------------
function CookieBanner() {
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);
  const [perf, setPerf] = useState(false);

  if (!show) return null;

  return (
    <>
      <div className="sx-213" role="region" aria-label="Aviso de cookies">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <span  className="sx-214">{I.cookie}</span>
            <p  className="sx-215">
              Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{" "}
              <a href="#"  className="sx-216">Política de Cookies</a> e{" "}
              <a href="#"  className="sx-217">LGPD</a>.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap flex-shrink-0">
            <button onClick={() => setModal(true)}  className="sx-218">
              Personalizar
            </button>
            <button onClick={() => setShow(false)}  className="sx-219">
              Rejeitar
            </button>
            <button onClick={() => setShow(false)}  className="sx-220">
              Aceitar todos
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div className="sx-221" role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title">
          <div  className="sx-222">
            <h3 id="cookie-preferences-title" className="sx-223">Preferências de Cookies</h3>
            {[
              { lbl: "Cookies estritamente necessários", desc: "Essenciais para o funcionamento do portal. Não podem ser desativados.", always: true },
              { lbl: "Cookies de desempenho", desc: "Nos ajudam a entender como os visitantes interagem com o portal.", always: false },
            ].map(({ lbl, desc, always }) => (
              <div key={lbl}  className="sx-224">
                <div>
                  <div  className="sx-225">{lbl}</div>
                  <div  className="sx-226">{desc}</div>
                </div>
                {always ? (
                  <span  className="sx-227">Sempre ativo</span>
                ) : (
                  <button type="button" onClick={() => setPerf(!perf)} role="switch" aria-checked={perf} aria-label={lbl}
                     className="sx-228">
                    <span className="sx-229" style={{ left: perf ? "21px" : "3px" }}/>
                  </button>
                )}
              </div>
            ))}
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setModal(false); setShow(false); }}  className="sx-230">
                Salvar preferências
              </button>
              <button onClick={() => setModal(false)}  className="sx-231">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function getRequirementBreadcrumb(slug: string, page: RequirementPageConfig) {
  for (const item of NAV_ITEMS) {
    const child = item.children.find(childLabel => NAVIGATION_REQUIREMENT_SLUGS[childLabel] === slug);
    if (child) {
      const label = child.includes(" - Página Temática") ? page.title : child;
      return [item.label, label];
    }
  }

  return [page.category, page.title];
}

const FAQ_ITEMS = [
  {
    theme: "Geral / IPTU",
    question: "Qual o dia de vencimento do IPTU 2021?",
    answer: "A Prefeitura Municipal de Roseira colocou o dia 10 de junho como o dia de vencimento da primeira parcela do IPTU de 2021.",
  },
  {
    theme: "Geral / IPTU",
    question: "Onde posso pagar o meu IPTU?",
    answer: "Os carnês podem ser pagos na Tesouraria da Prefeitura, Agência da Caixa Econômica Federal, Banco do Brasil e Casas Lotéricas.",
  },
  {
    theme: "Geral / IPTU",
    question: "Não sei onde guardei meu IPTU, como consigo a 2ª via?",
    answer: "A 2ª via das parcelas do IPTU pode ser obtida no site da Prefeitura Municipal de Roseira, pelo serviço de 2ª via do IPTU e taxas imobiliárias.",
  },
  {
    theme: "Geral / IPTU",
    question: "Existe algum desconto para quem não possui débitos anteriores?",
    answer: "Sim. Há desconto de 10% para pagamento em parcela única e 5% na opção de parcelamento.",
  },
  {
    theme: "Geral / IPTU",
    question: "Mesmo eu tendo débitos de anos anteriores, ainda consigo desconto no IPTU 2021?",
    answer: "Para obter o desconto no IPTU 2021, quem possui débitos anteriores deve procurar a Tesouraria da Prefeitura Municipal de Roseira para quitar ou parcelar esses débitos. Após o primeiro pagamento das parcelas atrasadas ou quitação, o carnê de IPTU 2021 terá desconto de 10% à vista ou 5% parcelado. O desconto somente será concedido com pagamento efetuado na Tesouraria da Prefeitura.",
  },
];

function FAQPage({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="faq-page">
      <section className="site-internal-hero concursos-hero faq-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Serviços" },
            { label: "Perguntas Frequentes" },
          ]} />
          <div className="faq-hero-grid">
            <div>
              <span className="concursos-hero-kicker">Atendimento ao cidadão</span>
              <h1 className="site-title">Perguntas Frequentes</h1>
              <p className="site-subtitle">
                Respostas objetivas para orientar o acesso a serviços, transparência, documentos públicos e canais oficiais da Prefeitura.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-content">
        <div className="max-w-7xl mx-auto px-4">
          <div className="faq-intro-grid">
            <article className="faq-panel">
              <Info aria-hidden="true" />
              <h2>Como esta página deve funcionar</h2>
              <p>
                A FAQ deve reunir dúvidas recorrentes em linguagem simples, agrupadas por tema, com respostas curtas, links para páginas oficiais e data de atualização.
              </p>
            </article>
            <article className="faq-panel">
              <ShieldCheck aria-hidden="true" />
              <h2>Requisitos esperados</h2>
              <p>
                Deve estar em local de fácil acesso, preferencialmente no menu de Serviços ou Atendimento, e indicar quando o usuário deve usar e-SIC, Ouvidoria ou atendimento presencial.
              </p>
            </article>
          </div>

          <div className="faq-toolbar">
            <div>
              <h2>Dúvidas frequentes</h2>
              <p>Conteúdo demonstrativo para receber as respostas oficiais da Prefeitura.</p>
            </div>
            <label className="faq-search">
              <span className="sr-only">Buscar dúvida frequente</span>
              {I.search}
              <input type="search" placeholder="Buscar por tema ou palavra-chave" />
            </label>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>
                  <span className="faq-question-icon" aria-hidden="true">?</span>
                  <span className="faq-question-text">
                    <strong>{item.question}</strong>
                  </span>
                  <span className="faq-arrow" aria-hidden="true">{I.chevDown}</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="faq-footer-grid">
            <article className="faq-service-note">
              <h2>Canais relacionados</h2>
              <div>
                <a href="#" className="site-green-pill-button">Acessar e-SIC {I.ext}</a>
                <a href="#" className="site-green-pill-button">Acessar Ouvidoria {I.ext}</a>
                <a href="#" className="site-green-pill-button">Carta de Serviços {I.ext}</a>
              </div>
            </article>
            <article className="faq-update-note">
              <span>Atualização</span>
              <p>Última atualização: não declarada. Responsável pela página: setor de atendimento/comunicação.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

function RequirementPage({ page, slug, onBackHome }: { page: RequirementPageConfig; slug: string; onBackHome: () => void }) {
  const statusText = page.kind === "external" ? "Integração externa" : page.kind === "service" ? "Serviço estruturado" : page.kind === "documents" ? "Documentos esperados" : "Tabela prevista";
  const isTablePage = page.kind === "table";
  const contentTitle = page.kind === "service" ? "Serviços previstos" : page.kind === "external" ? "Links e integrações" : page.kind === "documents" ? "Blocos de conteúdo" : "Tabela demonstrativa";
  const contentDescription = isTablePage
    ? "Modelo visual para demonstrar que a página possui Área própria de listagem, filtros e dados tabulares."
    : "Modelo visual para demonstrar a estrutura da página sem forçar uma tabela onde ela não é necessária.";
  const [breadcrumbSection, breadcrumbPage] = getRequirementBreadcrumb(slug, page);

  return (
    <div className="requirement-page">
      <section className="site-internal-hero concursos-hero requirement-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: breadcrumbSection },
            { label: breadcrumbPage },
          ]} />
          <div className="requirement-hero-grid">
            <div>
              <span className="concursos-hero-kicker">{page.category}</span>
              <h1 className="site-title">{page.title}</h1>
              <p className="site-subtitle">{page.subtitle}</p>
            </div>
            <div className="requirement-status-card">
              <span>Status estrutural</span>
              <strong>{statusText}</strong>
              <p>Página criada para receber dados oficiais, anexos e integrações quando o conteúdo definitivo for fornecido.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="requirement-content">
        <div className="max-w-7xl mx-auto px-4">
          <div className="requirement-summary-grid">
            <article className="requirement-panel">
              <h2>Elementos obrigatorios previstos</h2>
              <div className="requirement-checklist">
                {page.requiredElements.map(item => (
                  <div key={item} className="requirement-check-item">
                    <span aria-hidden="true">✓</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="requirement-panel">
              <h2>Origem de referencia</h2>
              <p className="requirement-panel-text">
                Estrutura criada a partir do mapa do site antigo e dos apontamentos PNTP. Os campos com "Não declarado" são reservas para conteúdo oficial.
              </p>
              {page.sourceUrl ? (
                <a className="site-green-pill-button requirement-source-link" href={page.sourceUrl} target="_blank" rel="noreferrer">
                  {page.sourceLabel ?? "Abrir referência"} {I.ext}
                </a>
              ) : (
                <span className="requirement-empty-source">Referência externa não localizada na análise.</span>
              )}
            </article>
          </div>

          <div className="requirement-table-toolbar">
            <div>
              <h2>{contentTitle}</h2>
              <p>{contentDescription}</p>
            </div>
            {isTablePage && (
              <div className="requirement-filter-row" aria-label="Filtros demonstrativos">
                <input type="search" placeholder="Buscar nesta página" aria-label="Buscar nesta página" />
                <select aria-label="Filtrar por exercício">
                  <option>Exercício</option>
                  <option>2026</option>
                  <option>2025</option>
                </select>
                <select aria-label="Filtrar por situação">
                  <option>Situação</option>
                  <option>Publicado</option>
                  <option>Pendente</option>
                </select>
              </div>
            )}
          </div>

          {isTablePage ? (
            <div className="requirement-table-wrap">
              <table className="requirement-table">
                <thead>
                  <tr>
                    {page.columns.map(column => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.rows.map((row, rowIndex) => (
                    <tr key={`${page.title}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${page.title}-${rowIndex}-${cellIndex}`}>
                          {cell.startsWith("http") ? (
                            <a href={cell} target="_blank" rel="noreferrer">Acessar</a>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="requirement-card-list">
              {page.rows.map((row, rowIndex) => (
                <article className="requirement-content-card" key={`${page.title}-${rowIndex}`}>
                  <span>{page.columns[0] ?? page.category}</span>
                  <h3>{row[0]}</h3>
                  <dl>
                    {row.slice(1).map((cell, cellIndex) => {
                      const label = page.columns[cellIndex + 1] ?? "Informação";
                      return (
                        <div key={`${page.title}-${rowIndex}-${cellIndex}`}>
                          <dt>{label}</dt>
                          <dd>
                            {cell.startsWith("http") ? (
                              <a href={cell} target="_blank" rel="noreferrer">Acessar</a>
                            ) : (
                              cell
                            )}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </article>
              ))}
            </div>
          )}

          <div className="requirement-note">
            <strong>Conteúdo provisório:</strong> esta página mostra a estrutura esperada. A validação PNTP real depende de documentos oficiais, atualização, filtros, arquivos pesquisáveis e links confirmados.
          </div>
        </div>
      </section>
    </div>
  );
}

// -----------------------------------------------------------------------------
// APP
// -----------------------------------------------------------------------------
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(0);
  const [page, setPage] = useState<AppPage>("home");
  const [activeNoticiaIndex, setActiveNoticiaIndex] = useState(0);
  const [activeLicitacaoIndex, setActiveLicitacaoIndex] = useState(0);
  const [activeLeiIndex, setActiveLeiIndex] = useState(0);
  const [activeDecretoIndex, setActiveDecretoIndex] = useState(0);
  const [activePortariaIndex, setActivePortariaIndex] = useState(0);
  const [activeSecretariaSlug, setActiveSecretariaSlug] = useState(SECRETARIA_DETAILS[0].slug);
  const [activeRequirementSlug, setActiveRequirementSlug] = useState("portal-transparencia");

  const fontScale = fontSize === -1 ? 0.9 : fontSize === 1 ? 1.1 : 1;
  const navigate = (nextPage: AppPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openNoticia = (index: number) => {
    setActiveNoticiaIndex(index);
    navigate("noticia-detail");
  };
  const openLicitacao = (index: number) => {
    setActiveLicitacaoIndex(index);
    navigate("licitacao-detail");
  };
  const openLei = (index: number) => {
    setActiveLeiIndex(index);
    navigate("lei-detail");
  };
  const openDecreto = (index: number) => {
    setActiveDecretoIndex(index);
    navigate("decreto-detail");
  };
  const openPortaria = (index: number) => {
    setActivePortariaIndex(index);
    navigate("portaria-detail");
  };
  const openSecretaria = (slug: string) => {
    setActiveSecretariaSlug(slug);
    navigate("secretaria-detail");
  };
  const openRequirement = (slug: string) => {
    setActiveRequirementSlug(slug);
    navigate("requirement-page");
  };
  const activeNoticia = NOTICIAS[activeNoticiaIndex] ?? NOTICIAS[0];
  const activeLicitacao = LICITACOES[activeLicitacaoIndex] ?? LICITACOES[0];
  const activeLei = LEGISLACAO[activeLeiIndex] ?? LEGISLACAO[0];
  const activeDecreto = DECRETOS[activeDecretoIndex] ?? DECRETOS[0];
  const activePortaria = PORTARIAS[activePortariaIndex] ?? PORTARIAS[0];
  const activeSecretaria = SECRETARIA_DETAILS.find((secretaria) => secretaria.slug === activeSecretariaSlug) ?? SECRETARIA_DETAILS[0];
  const activeRequirement = REQUIREMENT_PAGES[activeRequirementSlug] ?? REQUIREMENT_PAGES["portal-transparencia"];

  return (
    <div className={`sx-232 ${fontSize === -1 ? "font-scale-small" : fontSize === 1 ? "font-scale-large" : "font-scale-normal"}`}>
      <a href="#conteúdo-principal" className="skip-link">Pular para o conteúdo principal</a>
      <div className="site-header-fixed">
        <AccessBar fontSize={fontSize} setFontSize={setFontSize} />
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigateHome={() => navigate("home")} />
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPage={page} onNavigate={navigate} onOpenRequirement={openRequirement} onSelectSecretaria={openSecretaria} />
        <SearchBar />
      </div>
      {page === "home" && <AlertBanner />}
      <main id="conteudo-principal" tabIndex={-1}>
        {page === "concursos" ? (
          <ConcursosPage onBackHome={() => navigate("home")} />
        ) : page === "historia-roseira" ? (
          <HistoriaRoseiraPage onBackHome={() => navigate("home")} />
        ) : page === "contato" ? (
          <ContatoPage onBackHome={() => navigate("home")} />
        ) : page === "licitacoes" ? (
          <LicitacoesPage licitacoes={LICITACOES} onBackHome={() => navigate("home")} onSelectLicitacao={openLicitacao} />
        ) : page === "licitacao-detail" ? (
          <LicitacaoDetailPage licitacao={activeLicitacao} licitacoes={LICITACOES} onBackHome={() => navigate("home")} onBackList={() => navigate("licitacoes")} onSelectLicitacao={openLicitacao} />
        ) : page === "leis-municipais" ? (
          <LeisMunicipaisPage leis={LEGISLACAO} onBackHome={() => navigate("home")} onSelectLei={openLei} />
        ) : page === "lei-detail" ? (
          <LeiMunicipalDetailPage lei={activeLei} leis={LEGISLACAO} onBackHome={() => navigate("home")} onBackList={() => navigate("leis-municipais")} onSelectLei={openLei} />
        ) : page === "decretos" ? (
          <LeisMunicipaisPage leis={DECRETOS} config={DECRETOS_CONFIG} onBackHome={() => navigate("home")} onSelectLei={openDecreto} />
        ) : page === "decreto-detail" ? (
          <LeiMunicipalDetailPage lei={activeDecreto} leis={DECRETOS} config={DECRETOS_CONFIG} onBackHome={() => navigate("home")} onBackList={() => navigate("decretos")} onSelectLei={openDecreto} />
        ) : page === "portarias" ? (
          <LeisMunicipaisPage leis={PORTARIAS} config={PORTARIAS_CONFIG} onBackHome={() => navigate("home")} onSelectLei={openPortaria} />
        ) : page === "portaria-detail" ? (
          <LeiMunicipalDetailPage lei={activePortaria} leis={PORTARIAS} config={PORTARIAS_CONFIG} onBackHome={() => navigate("home")} onBackList={() => navigate("portarias")} onSelectLei={openPortaria} />
        ) : page === "noticias" ? (
          <NoticiasPage noticias={NOTICIAS} onBackHome={() => navigate("home")} onSelectNoticia={openNoticia} />
        ) : page === "noticia-detail" ? (
          <NoticiaDetailPage noticia={activeNoticia} noticias={NOTICIAS} onBackHome={() => navigate("home")} onBackList={() => navigate("noticias")} onSelectNoticia={openNoticia} />
        ) : page === "secretarias" ? (
          <SecretariasDirectoryPage secretarias={SECRETARIA_DETAILS} onBackHome={() => navigate("home")} onSelectSecretaria={openSecretaria} />
        ) : page === "secretaria-detail" ? (
          <SecretariaDetailPage secretaria={activeSecretaria} onBackHome={() => navigate("home")} onBackList={() => navigate("secretarias")} />
        ) : page === "faq" ? (
          <FAQPage onBackHome={() => navigate("home")} />
        ) : page === "requirement-page" ? (
          <RequirementPage page={activeRequirement} slug={activeRequirementSlug} onBackHome={() => navigate("home")} />
        ) : (
          <>
            <HeroSlider />
            <AcessoRapido />
            <Noticias onSelectNoticia={openNoticia} onOpenNoticias={() => navigate("noticias")} />
            <Publicacoes />
            <Galeria />
            <Secretarias onSelectSecretaria={openSecretaria} onOpenDirectory={() => navigate("secretarias")} />
            <CalendarioEventos />
            <Transparencia />
            <SocialNewsletter />
            <FaleConosco />
            <MapaTuristico />
          </>
        )}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
