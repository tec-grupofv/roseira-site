import { useState, useEffect, useMemo, useRef } from "react";
import type React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FileText, Info, Landmark, ShieldCheck, UsersRound } from "lucide-react";
import ConcursosPage, { ConcursoDetailPage, CONCURSOS_PAGE_ITEMS } from "./pages/ConcursosPage";
import LicitacoesPage, { LicitacaoDetailPage, LICITACOES_PAGE_CONFIGS } from "./pages/LicitacoesPage";
import LeisMunicipaisPage, { LeiMunicipalDetailPage, type LegislacaoPageConfig } from "./pages/LeisMunicipaisPage";
import NoticiasPage, { NoticiaDetailPage } from "./pages/NoticiasPage";
import SecretariaDetailPage, { SecretariasDirectoryPage } from "./pages/SecretariaDetailPage";
import HistoriaRoseiraPage from "./pages/HistoriaRoseiraPage";
import ContatoPage from "./pages/ContatoPage";
import AccessibilityPageExternal from "./pages/AccessibilityPage";
import FAQPageExternal from "./pages/FAQPage";
import RequirementPageExternal from "./pages/RequirementPage";
import HomePage from "./pages/HomePage";
import PrefeitoVicePage from "./pages/PrefeitoVicePage";
import GabinetePage from "./pages/GabinetePage";
import EstruturaAdministrativaPage from "./pages/EstruturaAdministrativaPage";
import TelefonesEnderecosPage from "./pages/TelefonesEnderecosPage";
import HorarioAtendimentoPage from "./pages/HorarioAtendimentoPage";
import SimbolosMunicipaisPage from "./pages/SimbolosMunicipaisPage";
import ConselhosMunicipaisPage from "./pages/ConselhosMunicipaisPage";
import MapaSitePage from "./pages/MapaSitePage";
import GaleriaFotosPage from "./pages/GaleriaFotosPage";
import TermosUsoPage from "./pages/TermosUsoPage";
import PoliticaCookiesPage from "./pages/PoliticaCookiesPage";
import LgpdPage from "./pages/LgpdPage";
import CartaServicosPage from "./pages/CartaServicosPage";
import ServicosCidadaoPage from "./pages/ServicosCidadaoPage";
import ServicosEmpresaPage from "./pages/ServicosEmpresaPage";
import ServicosServidorPage from "./pages/ServicosServidorPage";
import ProtocolosPage from "./pages/ProtocolosPage";
import EmissaoGuiasPage from "./pages/EmissaoGuiasPage";
import IptuPage from "./pages/IptuPage";
import DividaAtivaPage from "./pages/DividaAtivaPage";
import ItbiPage from "./pages/ItbiPage";
import NotaFiscalEletronicaPage from "./pages/NotaFiscalEletronicaPage";
import CadastroInscricaoMunicipalPage from "./pages/CadastroInscricaoMunicipalPage";
import BolsaFamiliaPage from "./pages/BolsaFamiliaPage";
import BancoPovoPage from "./pages/BancoPovoPage";
import AcessaSpPage from "./pages/AcessaSpPage";
import ConselhoTutelarPage from "./pages/ConselhoTutelarPage";
import JuntaMilitarPage from "./pages/JuntaMilitarPage";
import CovidPage from "./pages/CovidPage";
import PortalEducacaoPage from "./pages/PortalEducacaoPage";
import PlanoArborizacaoPage from "./pages/PlanoArborizacaoPage";
import CentroEsterilizacaoPage from "./pages/CentroEsterilizacaoPage";
import LeiAldirBlancPage from "./pages/LeiAldirBlancPage";
import VagasEmpregoPage from "./pages/VagasEmpregoPage";
import AgendamentoPage from "./pages/AgendamentoPage";
import ComunicadosPage from "./pages/ComunicadosPage";
import AgendaEventosPage from "./pages/AgendaEventosPage";
import CampanhasPage from "./pages/CampanhasPage";
import BoletinsOficiaisPage from "./pages/BoletinsOficiaisPage";
import LicitacoesAbertasPage from "./pages/LicitacoesAbertasPage";
import LicitacoesEncerradasPage from "./pages/LicitacoesEncerradasPage";
import ConcorrenciaPublicaPage from "./pages/ConcorrenciaPublicaPage";
import ChamadaPublicaPage from "./pages/ChamadaPublicaPage";
import PregaoPresencialPage from "./pages/PregaoPresencialPage";
import TomadaPrecosPage from "./pages/TomadaPrecosPage";
import LeilaoPage from "./pages/LeilaoPage";
import DispensasInexigibilidadesPage from "./pages/DispensasInexigibilidadesPage";
import ContratosLicitacoesPage from "./pages/ContratosLicitacoesPage";
import AditivosPage from "./pages/AditivosPage";
import AtasRegistroPrecosPage from "./pages/AtasRegistroPrecosPage";
import FornecedoresPage from "./pages/FornecedoresPage";
import PncpPage from "./pages/PncpPage";
import CodigoTributarioPage from "./pages/CodigoTributarioPage";
import PlanoDiretorPage from "./pages/PlanoDiretorPage";
import LeiOrganicaMunicipalPage from "./pages/LeiOrganicaMunicipalPage";
import OuvidoriaPage from "./pages/OuvidoriaPage";
import EsicPage from "./pages/EsicPage";
import EnderecoTelefonesPage from "./pages/EnderecoTelefonesPage";
import HorariosAtendimentoPage from "./pages/HorariosAtendimentoPage";
import MapaLocalizacaoPage from "./pages/MapaLocalizacaoPage";
import RedesSociaisPage from "./pages/RedesSociaisPage";
import SiteBreadcrumb from "./components/SiteBreadcrumb";
import { CONTACT_INFO, createSocialLinks } from "./siteContact";

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
  hideHeroMeta?: boolean;
  hideHeroCategory?: boolean;
  hideSummaryPanels?: boolean;
  hideRequirementNote?: boolean;
};

type SearchResult = {
  title: string;
  category: string;
  description: string;
  keywords: string;
  action: () => void;
  externalUrl?: string;
};

declare global {
  interface Window {
    VLibras?: {
      Widget: new (baseUrl: string) => unknown;
    };
    VLibrasWidget?: {
      open?: () => void;
    };
    roseiraVLibrasWidgetReady?: boolean;
  }
}

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
    children: ["História de Roseira", "Prefeito e Vice-prefeito", "Gabinete", "Estrutura Administrativa", "Telefones e Endereços", "Símbolos Municipais", "Conselhos Municipais", "Mapa do Site", "Galeria de Fotos", "Termos de Uso", "Política de Cookies", "LGPD", "Lei Aldir Blanc 2"],
  },
  {
    label: "Secretarias",
    children: ["Esporte", "Saúde", "Conselho Municipal de Educação", "Educação", "FUNDEB", "Conselho de Alimentação Escolar", "Vagas em Creche", "Turismo e Cultura", "Meio Ambiente"],
  },
  {
    label: "Serviços",
    children: ["Carta de Serviços", "Serviços ao Cidadão", "2ª Via IPTU / Taxas Imobiliárias", "IPTU", "Dívida Ativa", "Emissão Guias de ITBI", "Cadastro de Inscrição Municipal", "Acessa SP", "Portal da Educação", "RH Online", "Veracidade do Holerite", "Audiências Públicas", "Agendamento", "Perguntas Frequentes"],
  },
  {
    label: "Notícias",
    children: ["Últimas Notícias", "Comunicados", "Agenda de Eventos", "Campanhas", "Boletins Oficiais"],
  },
  {
    label: "Licitações",
    children: ["Licitações", "Concorrência Pública", "Chamada Pública", "Pregão Presencial", "Tomada de Preços", "Leilão", "Dispensas e Inexigibilidades", "Contratos", "Aditivos", "Atas de Registro de Preços", "Fornecedores", "PNCP"],
  },
  { label: "Concursos", children: [] },
  {
    label: "Transparência",
    children: ["Portal da Transparência", "Receitas", "Despesas", "Folha de Pagamento", "Diárias e Passagens", "Contratos", "Convênios e Repasses", "Obras Públicas", "Audiências Públicas", "PPA, LDO e LOA", "RREO e RGF", "Prestação de Contas", "Parecer do Tribunal de Contas", "Dados Abertos", "Radar da Transparência / Matriz Atricon"],
  },
  {
    label: "Legislação",
    children: ["Leis Municipais", "Decretos", "Portarias", "Resoluções", "Instruções", "Código Tributário", "Plano Diretor", "Lei Orgânica Municipal", "Atos Normativos"],
  },
  {
    label: "Contato",
    children: ["Fale Conosco", "Ouvidoria", "e-SIC", "Endereço e Telefones"],
  },
];

const LICITACOES_EXTERNAL_LINKS: Record<string, string> = {
  "Licitações em Aberto": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/licitacoes",
  "Licitações Encerradas": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/licitacoes",
  "Chamada Pública": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/chamamentos",
  "Concorrência Pública": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/chamamentos",
  "Dispensas e Inexigibilidades": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/dispensas",
  "Contratos": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/contratos",
  "Atas de Registro de Preços": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/atas",
};

const TRANSPARENCIA_EXTERNAL_LINKS: Record<string, string> = {
  "Receitas": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/execucao/receita/proprias",
  "Despesas": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/execucao/despesas-fonte-aplicacao",
  "Diárias e Passagens": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/execucao/diarias",
  "Contratos": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/contratos",
  "Convênios e Repasses": "https://pmroseira.geosiap.net.br:8443/portal-transparencia/licitacoes/convenios",
  "Radar da Transparência / Matriz Atricon": "https://radardatransparencia.atricon.org.br/",
};

const EXTERNAL_LINKS = {



  transparencia: CONTACT_INFO.transparencyPortalUrl,
  iptu: "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/arrecadacao/2via/index.php",
  iss: "https://pmroseira.geosiap.net.br:8443/pmroseira/issonline/iss.login.php",
  nfse: "https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional",
  rh: "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/recursos_humanos/grh/grh_rh_online.php",
  holerite: "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/recursos_humanos/fol/veracidade_holerith.php",
  sic: "https://www.roseira.sp.gov.br/sic-servico-de-informacao-ao-cidadao",
  mapaSite: "https://www.roseira.sp.gov.br/mapa-site/",
};

function getPortalLinkProps(label: string) {
  const requirementSlug = NAVIGATION_REQUIREMENT_SLUGS[label];
  if (requirementSlug) return { href: requirementPath(requirementSlug) };
  if (label !== "Portal da Transparência") return { href: "#conteudo-principal" };
  return { href: EXTERNAL_LINKS.transparencia, target: "_blank", rel: "noreferrer" };
}

function getChildHref(section: string, label: string) {
  if (section === "Transparência" && TRANSPARENCIA_EXTERNAL_LINKS[label]) return TRANSPARENCIA_EXTERNAL_LINKS[label];
  if (section === "Licitações" && label === "Licitações") return "/licitacoes/licitacoes";
  if (section === "Licitações" && ["Licitações em Aberto", "Licitações Encerradas"].includes(label)) return "/licitacoes/licitacoes";
  if (section === "Licitações" && NAVIGATION_REQUIREMENT_SLUGS[label]) return requirementPath(NAVIGATION_REQUIREMENT_SLUGS[label]);
  if (section === "Secretarias" && label === "Educação") return "/secretarias/educacao";
  if (label === "Portal da Transparência") return EXTERNAL_LINKS.transparencia;
  if (section === "Serviços" && label === "Dívida Ativa") return "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/arrecadacao/geda/geda_consulta.php";
  if (section === "Serviços" && label === "2ª Via IPTU / Taxas Imobiliárias") return "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/arrecadacao/2via/index.php";
  if (section === "Serviços" && label === "Serviços ao Cidadão") return "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/portal/";
  if (section === "Serviços" && label === "Audiências Públicas") return "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/portal/";
  if (section === "Serviços" && label === "RH Online") return "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/recursos_humanos/grh/grh_rh_online.php";
  if (section === "Serviços" && label === "Veracidade do Holerite") return "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/recursos_humanos/fol/veracidade_holerith.php";
  if (section === "Serviços" && label === "Emissão Guias de ITBI") return "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/arrecadacao/itbi/itbi_login.php";
  if (section === "Secretarias" && SECRETARIA_MENU_SLUGS[label]) return `/secretarias/${encodeURIComponent(SECRETARIA_MENU_SLUGS[label])}`;
  if (section === "A Prefeitura" && label === "História de Roseira") return PAGE_PATHS["historia-roseira"];
  if (section === "Notícias" && label === "Últimas Notícias") return "/noticias/ultimas-noticias";
  if (section === "Contato" && label === "Fale Conosco") return "/contato/fale-conosco";
  if (section === "Serviços" && label === "Perguntas Frequentes") return PAGE_PATHS.faq;
  if (section === "Legislação" && ["Leis Municipais", "Decretos", "Portarias"].includes(label)) return `/legislacao/${label.toLowerCase().replace(/ /g, "-")}`;
  if (section === "Legislação" && ["Resoluções", "Instruções"].includes(label)) return `/legislacao/${label === "Resoluções" ? "resolucoes" : "instrucoes"}`;
  if (section === "Legislação" && { "Código Tributário": "codigo-tributario", "Lei Orgânica Municipal": "lei-organica-municipal", "Atos Normativos": "atos-normativos" }[label]) return `/legislacao/${({ "Código Tributário": "codigo-tributario", "Lei Orgânica Municipal": "lei-organica-municipal", "Atos Normativos": "atos-normativos" } as Record<string, string>)[label]}`;
  const slug = NAVIGATION_REQUIREMENT_SLUGS[label];
  return slug ? requirementPath(slug) : "#conteudo-principal";
}

const { socialLinks: SOCIAL_LINKS, headerSocialLinks: HEADER_SOCIAL_LINKS } = createSocialLinks({
  FacebookIcon: FaFacebookF,
  YouTubeIcon: FaYoutube,
  InstagramIcon: FaInstagram,
  facebookSvg: I.fb,
  youtubeSvg: I.yt,
  instagramSvg: I.ig,
});

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
    hideSummaryPanels: true,
    hideHeroMeta: true,
    subtitle: "Página de referência para competencias, equipe responsável, atendimento e documentos do gabinete.",
    category: "Institucional",
    kind: "documents",
    requiredElements: ["Competências", "Responsável", "Horário de atendimento", "Documentos relacionados"],
    columns: ["Setor", "Responsável", "Telefone", "E-mail"],
    rows: [["Gabinete do Prefeito", "Não declarado", "Não declarado", "Não declarado"]],
  },
  "estrutura-administrativa": {
    title: "Estrutura Administrativa",
    hideHeroCategory: true,
    hideSummaryPanels: true,
    sectionMenu: ["Organograma", "Departamentos", "Competências"],
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
    hideRequirementNote: true,
    hideHeroMeta: true,
    hideSummaryPanels: true,
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
    category: "Atendimento",
    kind: "table",
    hideHeroCategory: true,
    hideSummaryPanels: true,
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
  "atos-normativos": {
    title: "Atos Normativos",
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
    hideRequirementNote: true,
    hideHeroMeta: true,
    hideSummaryPanels: true,
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
    hideHeroCategory: true,
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
  "cadastro-inscricao-municipal": {
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
    rows: [["Atendimento", "Não declarado"]],
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
};

const NAVIGATION_REQUIREMENT_SLUGS: Record<string, string> = {
  "Ouvidoria": "ouvidoria",
  "e-SIC": "e-sic",
  "Endereço e Telefones": "endereco-telefones",
  "Horários de Atendimento": "horarios-atendimento",
  "Mapa de Localização": "mapa-localizacao",
  "Redes Sociais": "redes-sociais",
  "Código Tributário": "codigo-tributario",
  "Plano Diretor": "plano-diretor",
  "Lei Orgânica Municipal": "lei-organica-municipal",
  "Atos Normativos": "atos-normativos",
  "Licitações em Aberto": "em-aberto",
  "Licitações Encerradas": "encerradas",
  "Concorrência Pública": "concorrencia-publica",
  "Chamada Pública": "chamada-publica",
  "Pregão Presencial": "pregao-presencial",
  "Tomada de Preços": "tomada-de-precos",
  "Leilão": "leilao",
  "Dispensas e Inexigibilidades": "dispensas-inexigibilidades",
  "Contratos": "contratos",
  "Aditivos": "aditivos",
  "Atas de Registro de Preços": "atas-registro-precos",
  "Fornecedores": "fornecedores",
  "PNCP": "pncp",
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
  "Emissão Guias de ITBI": "itbi",
  "Nota Fiscal Eletrônica": "nota-fiscal-eletronica",
  "Cadastro de Inscrição Municipal": "cadastro-inscricao-municipal",
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
const RESOLUCOES = [
  { num: "18-2026", desc: "Estabelece diretrizes para a execução de programas municipais", date: "26/06/2026", status: "Ativo" },
  { num: "17-2026", desc: "Aprova procedimentos administrativos e normas de atendimento", date: "12/06/2026", status: "Ativo" },
  { num: "16-2025", desc: "Regulamenta ações do conselho municipal para o exercício anterior", date: "18/12/2025", status: "Ativo" },
];
const INSTRUCOES = [
  { num: "9-2026", desc: "Orienta os procedimentos para tramitação de processos internos", date: "23/06/2026", status: "Ativo" },
  { num: "8-2026", desc: "Define rotinas para publicação e organização de documentos municipais", date: "09/06/2026", status: "Ativo" },
  { num: "7-2025", desc: "Estabelece instruções para execução de serviços administrativos", date: "16/12/2025", status: "Ativo" },
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
const CODIGO_TRIBUTARIO = [
  { num: "1-2026", desc: "Código Tributário Municipal - consulta consolidada", date: "10/01/2026", status: "Ativo" },
  { num: "45-2025", desc: "Atualiza regras de lançamento e arrecadação tributária", date: "18/12/2025", status: "Ativo" },
];
const LEI_ORGANICA_MUNICIPAL = [
  { num: "1-1990", desc: "Lei Orgânica do Município de Roseira - texto consolidado", date: "05/04/1990", status: "Ativo" },
  { num: "12-2024", desc: "Emenda à Lei Orgânica Municipal", date: "20/09/2024", status: "Ativo" },
];
const ATOS_OFICIAIS = [
  { num: "2036-2026", tipo: "Decreto", desc: "Ato oficial publicado pelo Município de Roseira", date: "25/06/2026", status: "Ativo" },
  { num: "2035-2026", tipo: "Portaria", desc: "Ato administrativo de interesse público", date: "19/06/2026", status: "Ativo" },
  { num: "2034-2025", tipo: "Resolução", desc: "Ato normativo municipal publicado no exercício anterior", date: "19/06/2025", status: "Ativo" },
  { num: "2033-2024", tipo: "Instrução", desc: "Ato normativo municipal publicado no histórico", date: "19/06/2024", status: "Ativo" },
];
const LEGISLACAO_ESPECIAL: Record<string, { leis: typeof CODIGO_TRIBUTARIO; config: LegislacaoPageConfig }> = {
  "codigo-tributario": { leis: CODIGO_TRIBUTARIO, config: { pageTitle: "Código Tributário Municipal", pageSubtitle: "Consulte o Código Tributário Municipal, suas normas complementares e atualizações.", itemLabel: "Código Tributário", summaryLabel: "Código Tributário Municipal", activeSummaryLabel: "Normas Vigentes", extraSummaryLabel: "Atualizações Tributárias", extraSummaryTone: "yellow", searchAriaLabel: "Filtrar código tributário municipal", foundLabel: "normas tributárias encontradas", detailInfoTitle: "Informações do Código Tributário Municipal", detailTitlePrefix: "Código Tributário Municipal Nº", relatedTitle: "Outras Normas Tributárias", documentLabel: "Código Tributário Municipal" } },
  "lei-organica-municipal": { leis: LEI_ORGANICA_MUNICIPAL, config: { pageTitle: "Lei Orgânica Municipal", pageSubtitle: "Consulte o texto consolidado e as emendas à Lei Orgânica Municipal.", itemLabel: "Lei Orgânica", summaryLabel: "Lei Orgânica", activeSummaryLabel: "Texto Vigente", extraSummaryLabel: "Emendas", extraSummaryTone: "yellow", searchAriaLabel: "Filtrar lei orgânica municipal", foundLabel: "publicações encontradas", detailInfoTitle: "Informações da Lei Orgânica", detailTitlePrefix: "Lei Orgânica Municipal Nº", relatedTitle: "Outras Publicações", documentLabel: "Lei Orgânica" } },
  "atos-normativos": { leis: ATOS_OFICIAIS, config: { pageTitle: "Atos Normativos", pageSubtitle: "Consulte portarias, resoluções, instruções e decretos expedidos pelo Município.", itemLabel: "Ato Normativo", summaryLabel: "Atos Normativos", activeSummaryLabel: "Atos Vigentes", extraSummaryLabel: "Publicações Recentes", extraSummaryTone: "yellow", searchAriaLabel: "Filtrar atos normativos por tipo, número ou ementa", foundLabel: "atos normativos encontrados", detailInfoTitle: "Informações do Ato Normativo", detailTitlePrefix: "Ato Normativo Nº", relatedTitle: "Outros Atos Normativos", documentLabel: "Documento do Ato Normativo" } },
  "resolucoes": { leis: RESOLUCOES, config: { pageTitle: "Resoluções", pageSubtitle: "Consulte as resoluções expedidas pelo Município de Roseira.", itemLabel: "Resolução", summaryLabel: "Resoluções", activeSummaryLabel: "Resoluções Vigentes", extraSummaryLabel: "Publicações Recentes", extraSummaryTone: "yellow", searchAriaLabel: "Filtrar resoluções por número ou ementa", foundLabel: "resoluções encontradas", detailInfoTitle: "Informações da Resolução", detailTitlePrefix: "Resolução Nº", relatedTitle: "Outras Resoluções", documentLabel: "Resolução" } },
  "instrucoes": { leis: INSTRUCOES, config: { pageTitle: "Instruções", pageSubtitle: "Consulte as instruções expedidas pelo Município de Roseira.", itemLabel: "Instrução", summaryLabel: "Instruções", activeSummaryLabel: "Instruções Vigentes", extraSummaryLabel: "Publicações Recentes", extraSummaryTone: "yellow", searchAriaLabel: "Filtrar instruções por número ou ementa", foundLabel: "instruções encontradas", detailInfoTitle: "Informações da Instrução", detailTitlePrefix: "Instrução Nº", relatedTitle: "Outras Instruções", documentLabel: "Instrução" } },
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

type QuickAccessCategory = "cidadao" | "empresa" | "principais";
const QUICK_ACCESS_TABS: { key: QuickAccessCategory; label: string; items: string[] }[] = [
  { key: "cidadao", label: "Cidadão", items: ["Portal da Transparência", "e-SUS", "Portal da Educação", "SIC - Acesso à Informação", "Concursos", "Educação"] },
  { key: "empresa", label: "Empresa", items: ["Cadastro de Inscrição Municipal", "ISS Online", "NFS-e", "Licitações", "Portal da Transparência", "Portal de Compras"] },
  { key: "principais", label: "Principais Serviços", items: ["2ª Via IPTU / Taxas Imobiliárias", "Cadastro Inscrição Municipal", "e-SUS", "ISS Online", "NFS-e", "Portal da Transparência", "RH Online", "SIC", "Veracidade do Holerite", "Ouvidoria Municipal"] },
];

const SECRETARIAS = [
  { nome: "Diretoria de Administração", diretor: "Isaac Pontes", horario: "08h às 17h", end: "Praça Sant'Ana, 201, Centro - Roseira/SP", tel: "Não declarado", email: "administracao@roseira.sp.gov.br" },
  { nome: "Diretoria de Cultura", diretor: "Wladimir Roberto Garcia de Paula Santos", horario: "08h às 17h", end: "Praça Sant'Ana, 201", tel: "(12) 3646-9900 / 202", email: "turismo@roseira.sp.gov.br" },
  { nome: "Diretoria de Esporte, Turismo e Lazer", diretor: "Zaneth de Sousa Miranda", horario: "08h às 17h", end: "R. Dep. Antônio Silvio Cunha Bueno - Nova Era", tel: "(12) 3646-3394", email: "secesportesroseira@gmail.com" },
  { nome: "Secretaria da Educação", diretor: "Leonaria Rodrigues de Sousa Corrêa", horario: "08h00 às 17h00", end: "Extensão da Praça Sant'Ana, 02 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "educação@roseira.sp.gov.br" },
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
  { slug: "educacao", nome: "Secretaria da Educação", shortName: "Educação", diretor: "Leonaria Rodrigues de Sousa Corrêa", cargo: "Responsável pela Secretaria da Educação", horario: "08h00 às 17h00", end: "Extensão da Praça Sant'Ana, 02 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "educação@roseira.sp.gov.br", summary: "Coordena ações pedagógicas, administrativas e de apoio escolar na rede municipal.", sobre: "A Diretoria de Educação coordena ações pedagógicas, administrativas e de apoio escolar, buscando fortalecer a aprendizagem, a permanência dos alunos e a qualidade da rede municipal.", competencias: ["Gestão da rede municipal de ensino", "Acompanhamento pedagógico das escolas", "Transporte, merenda e apoio escolar", "Formação de profissionais da educação", "Atendimento às famílias e estudantes"] },
  { slug: "saude", nome: "Diretoria de Saúde", shortName: "Saúde", diretor: "João Bosco de Almeida Maia", cargo: "Diretor de Saúde", horario: "08h às 17h", end: "Roque Vieira da Silva Nº197", tel: "(12) 3646-1210", email: "sms@roseira.sp.gov.br", summary: "Organiza a atenção à saúde, os serviços municipais e as ações de prevenção.", sobre: "A Diretoria de Saúde planeja e acompanha os serviços de saúde do município, incluindo atendimento à população, programas preventivos, vigilância e suporte às unidades municipais.", competencias: ["Atenção básica e atendimento à população", "Programas de prevenção e promoção da saúde", "Vigilância em saúde", "Gestão das unidades e equipes municipais", "Acompanhamento de demandas e encaminhamentos"] },
  { slug: "obras-infraestrutura", nome: "Obras e Serviços Municipais", shortName: "Obras e Serviços", diretor: "Não declarado", cargo: "Responsável pela área", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Cuida da manutenção urbana, infraestrutura e serviços operacionais do município.", sobre: "A área de Obras e Serviços Municipais acompanha demandas de manutenção urbana, conservação de vias, infraestrutura pública e apoio operacional aos serviços municipais.", competencias: ["Manutenção de vias e espaços públicos", "Apoio a obras e infraestrutura", "Conservação urbana", "Serviços operacionais", "Atendimento de demandas da população"] },
  { slug: "esporte-turismo-lazer", nome: "Diretoria de Esporte, Turismo e Lazer", shortName: "Esporte, Turismo e Lazer", diretor: "Zaneth de Sousa Miranda", cargo: "Diretora de Esporte, Turismo e Lazer", horario: "08h às 17h", end: "R. Dep. Antônio Silvio Cunha Bueno - Nova Era", tel: "(12) 3646-3394", email: "secesportesroseira@gmail.com", summary: "Promove atividades esportivas, ações de turismo e iniciativas de lazer.", sobre: "A Diretoria de Esporte, Turismo e Lazer desenvolve atividades esportivas, eventos, programas de incentivo à prática física e ações de valorização turística e cultural do município.", competencias: ["Eventos esportivos e recreativos", "Apoio a equipes e atletas", "Promoção do turismo local", "Projetos de lazer comunitário", "Gestão de espaços esportivos"] },
  { slug: "financas", nome: "Diretoria de Finanças", shortName: "Finanças", diretor: "Luiz Carlos Rodrigues", cargo: "Diretor de Finanças", horario: "8h às 17h", end: "Praça Sant'Ana, 201 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "lcarlos@roseira.sp.gov.br", summary: "Coordena orçamento, receitas, despesas e controle financeiro municipal.", sobre: "A Diretoria de Finanças acompanha a gestão orçamentária, financeira e contábil do município, com foco no equilíbrio das contas públicas e no cumprimento das obrigações legais.", competencias: ["Gestão orçamentária e financeira", "Controle de receitas e despesas", "Acompanhamento contábil", "Planejamento fiscal", "Prestação de informações financeiras"] },
  { slug: "cultura", nome: "Diretoria de Cultura", shortName: "Cultura", diretor: "Wladimir Roberto Garcia de Paula Santos", cargo: "Diretor de Cultura", horario: "08h às 17h", end: "Praça Sant'Ana, 201", tel: "(12) 3646-9900 / 202", email: "turismo@roseira.sp.gov.br", summary: "Promove ações culturais, eventos e valorização da memória local.", sobre: "A Diretoria de Cultura organiza iniciativas culturais, eventos públicos e ações de valorização da identidade, da memória e da participação comunitária.", competencias: ["Promoção de eventos culturais", "Apoio a artistas e grupos locais", "Valorização da memória municipal", "Projetos de formação cultural", "Articulação de ações comunitárias"] },
  { slug: "esporte", nome: "Secretaria de Esporte", shortName: "Esporte", diretor: "Não declarado", cargo: "Responsável pela área", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Promove esporte, atividade física e lazer para a comunidade.", sobre: "A Secretaria de Esporte organiza programas, eventos e atividades esportivas, incentivando hábitos saudáveis e a participação da comunidade.", competencias: ["Programas esportivos", "Eventos e competições", "Apoio a atletas e equipes", "Atividades físicas comunitárias"] },
  { slug: "conselho-educacao", nome: "Conselho Municipal de Educação", shortName: "Conselho de Educação", diretor: "Não declarado", cargo: "Responsável pelo conselho", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Acompanha e participa das políticas públicas municipais de educação.", sobre: "O Conselho Municipal de Educação atua na participação social, no acompanhamento das políticas educacionais e na articulação com a rede municipal de ensino.", competencias: ["Participação e controle social", "Acompanhamento das políticas educacionais", "Análise de propostas e normas", "Articulação com a comunidade escolar"] },
  { slug: "fundeb", nome: "FUNDEB", shortName: "FUNDEB", diretor: "Não declarado", cargo: "Responsável pelo conselho", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Acompanha a aplicação dos recursos destinados à educação básica.", sobre: "O FUNDEB reúne informações e ações de acompanhamento e controle social dos recursos vinculados à manutenção e ao desenvolvimento da educação básica.", competencias: ["Acompanhamento da aplicação dos recursos", "Controle social", "Análise de prestações de contas", "Transparência das informações educacionais"] },
  { slug: "conselho-alimentacao-escolar", nome: "Conselho de Alimentação Escolar", shortName: "Alimentação Escolar", diretor: "Não declarado", cargo: "Responsável pelo conselho", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Acompanha a execução da alimentação escolar na rede municipal.", sobre: "O Conselho de Alimentação Escolar acompanha a qualidade, a execução e o controle social das ações de alimentação oferecidas aos estudantes.", competencias: ["Acompanhamento da alimentação escolar", "Controle social do programa", "Análise da qualidade das refeições", "Participação em visitas e relatórios"] },
  { slug: "vagas-creche", nome: "Vagas em Creche", shortName: "Vagas em Creche", diretor: "Não declarado", cargo: "Responsável pela área", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Orienta famílias sobre cadastro e acompanhamento de vagas em creches.", sobre: "A área de Vagas em Creche organiza orientações e informações para solicitação, cadastro e acompanhamento de vagas na educação infantil municipal.", competencias: ["Orientação às famílias", "Cadastro e atualização de solicitações", "Acompanhamento da demanda", "Informações sobre unidades municipais"] },
  { slug: "turismo-cultura", nome: "Secretaria de Turismo e Cultura", shortName: "Turismo e Cultura", diretor: "Não declarado", cargo: "Responsável pela área", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Valoriza o patrimônio, a cultura e o potencial turístico de Roseira.", sobre: "A Secretaria de Turismo e Cultura desenvolve ações de valorização da identidade local, do patrimônio, dos eventos e dos atrativos turísticos do município.", competencias: ["Promoção do turismo local", "Valorização do patrimônio cultural", "Organização de eventos", "Apoio a iniciativas culturais"] },
  { slug: "meio-ambiente", nome: "Secretaria de Meio Ambiente", shortName: "Meio Ambiente", diretor: "Não declarado", cargo: "Responsável pela área", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Promove ações de proteção ambiental e sustentabilidade no município.", sobre: "A Secretaria de Meio Ambiente acompanha políticas de conservação, educação ambiental, arborização e sustentabilidade em Roseira.", competencias: ["Educação ambiental", "Conservação e fiscalização", "Arborização urbana", "Ações de sustentabilidade"] },
  { slug: "cadastro-inscricao-municipal", nome: "Cadastro de Inscrição Municipal", shortName: "Inscrição Municipal", diretor: "Não declarado", cargo: "Responsável pela área", horario: "Não declarado", end: "Não declarado", tel: "Não declarado", email: "Não declarado", summary: "Orienta empresas e profissionais sobre inscrição e cadastro municipal.", sobre: "A área de Cadastro de Inscrição Municipal presta orientações sobre cadastro, atualização e regularização de atividades econômicas no município.", competencias: ["Orientação cadastral", "Inscrição e atualização de dados", "Regularização de atividades", "Atendimento a empresas e profissionais"] },
];

const SECRETARIA_MENU_SLUGS: Record<string, string> = {
  "Esporte": "esporte",
  "Saúde": "saude",
  "Conselho Municipal de Educação": "conselho-educacao",
  "Educação": "educacao",
  "FUNDEB": "fundeb",
  "Conselho de Alimentação Escolar": "conselho-alimentacao-escolar",
  "Vagas em Creche": "vagas-creche",
  "Turismo e Cultura": "turismo-cultura",
  "Meio Ambiente": "meio-ambiente",
  "Cadastro de Inscrição Municipal": "cadastro-inscricao-municipal",
  "Administração": "administracao",
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
  { name: "Português", code: "pt-BR", flagSrc: "https://flagcdn.com/w40/br.png", flagAlt: "Bandeira do Brasil" },
  { name: "English", code: "en", flagSrc: "https://flagcdn.com/w40/us.png", flagAlt: "Bandeira dos Estados Unidos" },
  { name: "Español", code: "es", flagSrc: "https://flagcdn.com/w40/es.png", flagAlt: "Bandeira da Espanha" },
  { name: "Français", code: "fr", flagSrc: "https://flagcdn.com/w40/fr.png", flagAlt: "Bandeira da França" },
  { name: "Deutsch", code: "de", flagSrc: "https://flagcdn.com/w40/de.png", flagAlt: "Bandeira da Alemanha" },
  { name: "Italiano", code: "it", flagSrc: "https://flagcdn.com/w40/it.png", flagAlt: "Bandeira da Itália" },
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

function applyAccessibleFontScale(root: HTMLElement | null, scale: number) {
  if (!root || typeof window === "undefined") return;

  const selector = "p, a, button, span, label, input, textarea, select, li, td, th, h1, h2, h3, h4, h5, h6, strong, small";
  const elements = Array.from(root.querySelectorAll<HTMLElement>(selector));

  elements.forEach((element) => {
    if (!element.dataset.baseFontSize) {
      element.dataset.baseFontSize = window.getComputedStyle(element).fontSize;
    }

    const baseFontSize = Number.parseFloat(element.dataset.baseFontSize);
    if (!Number.isFinite(baseFontSize)) return;

    if (scale === 1) {
      element.style.removeProperty("font-size");
      return;
    }

    element.style.fontSize = `${Math.round(baseFontSize * scale * 1000) / 1000}px`;
  });
}

const FONT_SCALE_MIN = 90;
const FONT_SCALE_MAX = 130;
const FONT_SCALE_STEP = 5;

function clampFontScale(value: number) {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, value));
}

async function openVLibrasWidget() {
  window.dispatchEvent(new CustomEvent("roseira-open-vlibras"));
  if (window.VLibrasWidget?.open) {
    window.VLibrasWidget.open();
    return;
  }

  window.setTimeout(() => window.VLibrasWidget?.open?.(), 500);
}

function VLibrasWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const accessButtonRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.setAttribute("vw", "");
    accessButtonRef.current?.setAttribute("vw-access-button", "");
    wrapperRef.current?.setAttribute("vw-plugin-wrapper", "");

    const initializeWidget = () => {
      if (!window.VLibras || window.roseiraVLibrasWidgetReady) return;
      new window.VLibras.Widget("https://vlibras.gov.br/app");
      window.roseiraVLibrasWidgetReady = true;
    };

    const activateFixedWidget = () => {
      const startedAt = Date.now();
      const tryActivate = () => {
        const button = document.querySelector<HTMLElement>(".vlibras-button, [vlibras-button]")
          ?? accessButtonRef.current?.querySelector<HTMLElement>("button, a, [role='button']")
          ?? accessButtonRef.current;
        if (button && window.roseiraVLibrasWidgetReady) {
          const clickable = button.querySelector<HTMLElement>("button, a, [role='button']") ?? button;
          clickable.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
          wrapperRef.current?.classList.add("active");
          return;
        }

        if (Date.now() - startedAt < 10000) window.setTimeout(tryActivate, 100);
      };

      tryActivate();
    };

    window.addEventListener("roseira-open-vlibras", activateFixedWidget);

    const existingScript = document.getElementById("vlibras-plugin-script") as HTMLScriptElement | null;
    if (existingScript) {
      if (existingScript.dataset.loaded === "true") initializeWidget();
      else existingScript.addEventListener("load", initializeWidget, { once: true });
      return () => window.removeEventListener("roseira-open-vlibras", activateFixedWidget);
    }

    const script = document.createElement("script");
    script.id = "vlibras-plugin-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      initializeWidget();
    };
    document.body.appendChild(script);

    return () => window.removeEventListener("roseira-open-vlibras", activateFixedWidget);
  }, []);

  return (
    <div ref={containerRef} className="enabled vlibras-widget-host">
      <div ref={accessButtonRef} className="active vlibras-button" vlibras-button="" />
      <div ref={wrapperRef}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
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
function AccessBar({
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  onOpenAccessibility,
}: {
  fontSize: number;
  setFontSize: (n: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  onOpenAccessibility: () => void;
}) {
  const [lang, setLang] = useState("Português");
  const [showLang, setShowLang] = useState(false);
  const [supportPanel, setSupportPanel] = useState<"vlibras" | "qr" | null>(null);
  const currentLang = LANGS.find(l => l.name === lang) ?? LANGS[0];

  useEffect(() => {
    document.documentElement.lang = currentLang.code;
  }, [currentLang.code]);

  return (
    <div  className="sx-2">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {I.clock}
            <span  className="sx-3">
              {CONTACT_INFO.businessHoursShort}
            </span>
          </div>
          <span  className="sx-4">|</span>
          <a href={EXTERNAL_LINKS.mapaSite} title="Mapa do Site" className="hover:text-white sx-5">Mapa do Site</a>
        </div>
        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Font size */}
          <div className="flex items-center gap-1">
            <span  className="sx-7">Fonte:</span>
            <button
              type="button"
              onClick={() => setFontSize(clampFontScale(fontSize - FONT_SCALE_STEP))}
              disabled={fontSize <= FONT_SCALE_MIN}
              aria-label="Diminuir fonte em 5 por cento"
              title="Diminuir fonte"
              className="sx-8 font-button-muted"
            >
              A-
            </button>
            <label htmlFor="font-size-control" className="font-size-slider-label">
              <span className="sr-only">Escolher tamanho da fonte</span>
              <input
                id="font-size-control"
                type="range"
                min={FONT_SCALE_MIN}
                max={FONT_SCALE_MAX}
                step={FONT_SCALE_STEP}
                value={fontSize}
                onChange={(event) => setFontSize(clampFontScale(Number(event.target.value)))}
                aria-label="Escolher tamanho da fonte"
                title="Tamanho da fonte"
                aria-valuetext={`${fontSize}%`}
                className="font-size-slider"
              />
            </label>
            <button
              type="button"
              onClick={() => setFontSize(100)}
              aria-label="Voltar fonte para o tamanho original"
              title="Fonte original"
              aria-pressed={fontSize === 100}
              className={`sx-8 ${fontSize === 100 ? "font-button-active" : "font-button-muted"}`}
            >
              A
            </button>
            <span className="font-size-current" aria-live="polite">{fontSize}%</span>
            <button
              type="button"
              onClick={() => setFontSize(clampFontScale(fontSize + FONT_SCALE_STEP))}
              disabled={fontSize >= FONT_SCALE_MAX}
              aria-label="Aumentar fonte em 5 por cento"
              title="Aumentar fonte"
              className="sx-8 font-button-muted"
            >
              A+
            </button>
          </div>
          <button type="button" onClick={onOpenAccessibility} title="Acessibilidade" className="sx-11">Acessibilidade</button>
          <span  className="sx-9">|</span>
          <button type="button" onClick={() => setHighContrast(!highContrast)} title="Alto Contraste" aria-pressed={highContrast} className={`sx-10 ${highContrast ? "access-action-active" : ""}`}>
            {highContrast ? "Desativar Alto Contraste" : "Alto Contraste"}
          </button>
          <button type="button" onClick={async () => { await openVLibrasWidget(); setSupportPanel(null); }} title="VLibras" aria-expanded="false" className="sx-11">
            {I.accessible} VLibras
          </button>
          <span  className="sx-13">|</span>
          {/* Language */}
          <div  className="sx-14">
            <button
              type="button"
              onClick={() => setShowLang(!showLang)}
              title="Idioma"
              aria-expanded={showLang}
              aria-haspopup="menu"

             className="sx-15">
              <img className="language-flag-image" src={currentLang.flagSrc} alt={currentLang.flagAlt} />
            </button>
            {showLang && (
              <div className="sx-16" role="menu" aria-label="Selecionar idioma do documento">
                {LANGS.map(l => (
                  <button key={l.name} type="button" onClick={() => { setLang(l.name); setShowLang(false); }} title={l.name}
                    role="menuitemradio"
                    aria-checked={lang === l.name}
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
            {HEADER_SOCIAL_LINKS.map(({ label, href, title, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={title} className="social-icon-link">
                {Icon ? <Icon aria-hidden="true" /> : null}
              </a>
            ))}
          </div>
        </div>
      </div>
      {supportPanel && (
        <div id="access-support-panel" className="access-support-panel" role="status" aria-live="polite">
          {supportPanel === "vlibras" ? (
            <>
              <strong>VLibras</strong>
              <span>O widget oficial VLibras está instalado no portal. Use o botão flutuante de acessibilidade para abrir a tradução em Libras.</span>
              <a href="https://www.gov.br/governodigital/pt-br/vlibras" target="_blank" rel="noreferrer" title="VLibras">Abrir página oficial do VLibras {I.ext}</a>
            </>
          ) : (
            <>
              <strong>QR Code da página</strong>
              <span>Abra o gerador de QR Code com o endereço desta página para compartilhar o acesso em outro dispositivo.</span>
              <a href={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" title="QR Code">Abrir QR Code {I.ext}</a>
            </>
          )}
          <button type="button" onClick={() => setSupportPanel(null)} aria-label="Fechar painel de acessibilidade" title="Fechar">Fechar</button>
        </div>
      )}
      {lang !== "Português" && (
        <div className="access-language-note" role="status" aria-live="polite">
          Idioma do documento definido como {currentLang.name}. Conteúdo traduzido automaticamente ainda não está disponível.
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------
function Header({ menuOpen, setMenuOpen, onNavigateHome }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void; onNavigateHome: () => void }) {
  const [weather, setWeather] = useState({ current: 24, maximum: 31 });
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-22.8956&longitude=-45.3053&current=temperature_2m&daily=temperature_2m_max&forecast_days=1&timezone=America%2FSao_Paulo", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("weather request failed")))
      .then((data: { current?: { temperature_2m?: number }; daily?: { temperature_2m_max?: number[] } }) => {
        const current = data.current?.temperature_2m;
        const maximum = data.daily?.temperature_2m_max?.[0];
        if (typeof current === "number" && typeof maximum === "number") setWeather({ current: Math.round(current), maximum: Math.round(maximum) });
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);
  return (
    <div  className="sx-19">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
        {/* Logo */}
        <button type="button" onClick={onNavigateHome} title="Início" className="brand-home-link flex items-center gap-3 flex-shrink-0" aria-label="Ir para a página inicial">
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
            { lbl: "Portal da Transparência", color: "#1351B4", href: EXTERNAL_LINKS.transparencia },
            { lbl: "Ouvidoria", color: "#168821" },
            { lbl: "SIC", color: "#0C326F", href: "/contato/e-sic" },
            { lbl: "Webmail / Servidor", color: "#505C6D", href: CONTACT_INFO.webmailUrl },
          ].map(({ lbl, color, href }) => (
            <a
              key={lbl}
              href={href ?? "#conteudo-principal"}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
              title={lbl}

              className={`hover:opacity-80 sx-23 ${quickPillClass(color)}`}
            >
              {lbl} {I.ext}
            </a>
          ))}
        </div>

        {/* Weather */}
        <div className="hidden md:flex items-center gap-1.5 sx-24" >
          {I.sun}
          <span className="sx-25">{weather.current}°</span>
          <span className="sx-26">/ {weather.maximum}°</span>
        </div>

        {/* Mobile hamburger */}
        <button type="button" className="lg:hidden sx-27" onClick={() => setMenuOpen(!menuOpen)} title="Menu" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
          {menuOpen ? I.close : I.menu}
        </button>
      </div>
    </div>
  );
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function SearchBar({ results }: { results: SearchResult[] }) {
  const [search, setSearch] = useState("");
  const searchAreaRef = useRef<HTMLDivElement>(null);
  const query = normalizeSearchText(search);
  const filteredResults = query
    ? results
        .filter((result) => normalizeSearchText(`${result.title} ${result.category} ${result.description} ${result.keywords}`).includes(query))
        .slice(0, 8)
    : [];

  const openResult = (result: SearchResult) => {
    result.action();
    setSearch("");
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filteredResults[0]) openResult(filteredResults[0]);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (searchAreaRef.current && !searchAreaRef.current.contains(event.target as Node)) {
        setSearch("");
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div id="busca-portal" ref={searchAreaRef} className="sx-28" tabIndex={-1}>
      <div className="max-w-7xl mx-auto px-4 py-2">
        <form className="sx-29 site-search-form" role="search" onSubmit={submitSearch}>
          <div className="sx-30" aria-hidden="true">{I.search}</div>
          <input
            value={search}
            aria-label="Buscar no portal"
            onChange={e => setSearch(e.target.value)}
            autoComplete="off"
            placeholder="Buscar no portal - serviços, notícias, decretos, licitações..."
            className="sx-31"
          />
          <button type="submit" title="Buscar" className="sx-32">
            Buscar
          </button>
        </form>
        {search.trim() && (
          <div className="site-search-results" role="listbox" aria-label="Resultados da busca">
            {filteredResults.length ? (
              filteredResults.map((result) => (
                <button
                  key={`${result.category}-${result.title}`}
                  type="button"
                  title={result.title}
                  className="site-search-result"
                  onClick={() => openResult(result)}
                >
                  <span style={{ color: "var(--green-dark)" }}>{result.category}</span>
                  <strong>{result.title}</strong>
                  <small>{result.description}</small>
                </button>
              ))
            ) : (
              <p className="site-search-empty">Nenhum resultado encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------------------------
type AppPage = "home" | "historia-roseira" | "contato" | "fale-conosco" | "concursos" | "concurso-detail" | "licitacoes" | "licitacao-detail" | "leis-municipais" | "lei-detail" | "decretos" | "decreto-detail" | "portarias" | "portaria-detail" | "legislacao-special" | "legislacao-special-detail" | "noticias" | "ultimas-noticias" | "noticia-detail" | "secretarias" | "secretaria-detail" | "faq" | "accessibility" | "requirement-page";

function NavBar({ menuOpen, setMenuOpen, currentPage, activeSecretariaSlug, activeRequirementSlug, onNavigate, onOpenRequirement, onSelectSecretaria }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void; currentPage: AppPage; activeSecretariaSlug: string; activeRequirementSlug: string; onNavigate: (page: AppPage) => void; onOpenRequirement: (slug: string) => void; onSelectSecretaria: (slug: string) => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const menuKey = (label: string) => label.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase();

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenIdx(null);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const isActiveItem = (label: string) => {
    const key = menuKey(label);
    if (key.startsWith("concurso")) return currentPage === "concursos";
    if (key.startsWith("licita")) return currentPage === "licitacoes" || currentPage === "licitacao-detail";
    if (key.startsWith("not")) return currentPage === "noticias" || currentPage === "noticia-detail" || currentPage === "ultimas-noticias";
    if (key.startsWith("secret")) return currentPage === "secretarias" || currentPage === "secretaria-detail";
    if (key.startsWith("legis")) return currentPage === "leis-municipais" || currentPage === "lei-detail" || currentPage === "decretos" || currentPage === "decreto-detail" || currentPage === "portarias" || currentPage === "portaria-detail";
    if (key.startsWith("a prefeitura")) return currentPage === "historia-roseira";
    if (key.startsWith("contato")) return currentPage === "contato" || currentPage === "fale-conosco" || (currentPage === "requirement-page" && ["endereco-telefones", "horarios-atendimento", "mapa-localizacao", "redes-sociais", "ouvidoria", "esic"].includes(activeRequirementSlug));
    if (key.startsWith("servi")) return currentPage === "faq" || (currentPage === "requirement-page" && ["carta-servicos", "servicos-cidadao", "servicos-empresa", "servicos-servidor", "protocolos", "emissao-guias", "iptu", "divida-ativa", "itbi", "nota-fiscal-eletronica", "cadastro-inscricao-municipal", "bolsa-familia", "banco-povo", "acessa-sp", "conselho-tutelar", "junta-militar", "covid-19", "portal-educacao", "plano-arborizacao", "centro-esterilizacao", "lei-aldir-blanc", "vagas-emprego", "agendamento"].includes(activeRequirementSlug));
    if (key.startsWith("transpar")) return currentPage === "requirement-page" && !["endereco-telefones", "horarios-atendimento", "mapa-localizacao", "redes-sociais", "ouvidoria", "esic", "carta-servicos", "servicos-cidadao", "servicos-empresa", "servicos-servidor", "protocolos", "emissao-guias", "iptu", "divida-ativa", "itbi", "nota-fiscal-eletronica", "cadastro-inscricao-municipal", "bolsa-familia", "banco-povo", "acessa-sp", "conselho-tutelar", "junta-militar", "covid-19", "portal-educacao", "plano-arborizacao", "centro-esterilizacao", "lei-aldir-blanc", "vagas-emprego", "agendamento"].includes(activeRequirementSlug);
    return false;
  };

  return (
    <nav id="menu-principal" ref={ref} className="sx-33" tabIndex={-1}>
      {/* Desktop */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.label} onMouseLeave={() => setOpenIdx(null)} className="sx-34">
              <button type="button" title={item.label}
                onMouseEnter={() => item.children.length ? setOpenIdx(idx) : setOpenIdx(null)}
                onClick={() => {
                  if (item.label === "Concursos") onNavigate("concursos");
                  if (item.label === "Licitações") onNavigate("licitacoes");
                  if (item.label === "Notícias") onNavigate("noticias");
                }}

                className={[openIdx === idx ? "bg-white/15" : "hover:bg-white/10", isActiveItem(item.label) ? "nav-item-active" : "", "sx-35"].filter(Boolean).join(" ")}
                style={isActiveItem(item.label) ? { borderBottom: "4px solid var(--yellow)" } : undefined}
              >
                {item.label}
                {item.children.length > 0 && I.chevDown}
              </button>
              {openIdx === idx && item.children.length > 0 && (
                <div
                  onMouseLeave={() => setOpenIdx(null)}

                 className="sx-36">
                  {item.children.map(child => (
                    <a key={child} href={getChildHref(item.label, child)} title={child}
                      onClick={(event) => {
                        if (item.label === "Transparência" && TRANSPARENCIA_EXTERNAL_LINKS[child]) {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Licitações" && LICITACOES_EXTERNAL_LINKS[child]) {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Secretarias" && child === "Educação") {
                          event.preventDefault();
                          onSelectSecretaria("educacao");
                          setOpenIdx(null);
                          return;
                        }
                        if (child === "Portal da Transparência") {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Serviços" && child === "Dívida Ativa") {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Serviços" && child === "2ª Via IPTU / Taxas Imobiliárias") {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Serviços" && child === "Serviços ao Cidadão") {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Serviços" && child === "Audiências Públicas") {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Serviços" && child === "RH Online") {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Serviços" && child === "Veracidade do Holerite") {
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Serviços" && child === "Emissão Guias de ITBI") {
                          setOpenIdx(null);
                          return;
                        }
                        const secretariaSlug = SECRETARIA_MENU_SLUGS[child];
                        if (item.label === "Secretarias" && secretariaSlug) {
                          event.preventDefault();
                          if (SECRETARIA_DETAILS.some(secretaria => secretaria.slug === secretariaSlug)) onSelectSecretaria(secretariaSlug);
                          else onOpenRequirement(secretariaSlug);
                          setOpenIdx(null);
                          return;
                        }
                        if (item.label === "Notícias" && child === "Últimas Notícias") {
                          event.preventDefault();
                          onNavigate("ultimas-noticias");
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
                          onNavigate("fale-conosco");
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
                      className={["gray-hover", "sx-37", item.label === "Secretarias" && SECRETARIA_MENU_SLUGS[child] === activeSecretariaSlug ? "submenu-item-active" : ""].filter(Boolean).join(" ")}
                      aria-current={item.label === "Secretarias" && SECRETARIA_MENU_SLUGS[child] === activeSecretariaSlug ? "page" : undefined}
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
        <div className="lg:hidden sx-38">
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.label} className="sx-39">
              <button type="button" title={item.label} onClick={(event) => {
                event.preventDefault();
                if (item.children.length > 0) { setMobileOpenIdx(current => current === idx ? null : idx); return; }
                if (item.label === "Concursos") onNavigate("concursos");
                else if (item.label === "Licitações") onNavigate("licitacoes");
                else if (item.label === "Notícias") onNavigate("noticias");
                else if (item.label === "Secretarias") onNavigate("secretarias");
                else if (item.label === "Legislação") onNavigate("leis-municipais");
                else if (item.label === "A Prefeitura") onNavigate("historia-roseira");
                else if (item.label === "Contato") onNavigate("contato");
                setMenuOpen(false);
              }} className={["sx-40", isActiveItem(item.label) ? "site-nav-active" : ""].filter(Boolean).join(" ")} aria-current={isActiveItem(item.label) ? "page" : undefined} aria-expanded={item.children.length > 0 ? mobileOpenIdx === idx : undefined}>
                {item.label} {item.children.length > 0 && (mobileOpenIdx === idx ? I.chevDown : I.chevRight)}
              </button>
              {mobileOpenIdx === idx && item.children.length > 0 && (
                <div className="mobile-submenu" role="menu" aria-label={"Submenu " + item.label}>
                  {item.children.map(child => <a key={child} href={getChildHref(item.label, child)} title={child} role="menuitem" onClick={() => setMenuOpen(false)}>{child}</a>)}
                </div>
              )}
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
            <a href="#conteudo-principal" title="Saiba mais" className="sx-45">Clique aqui para saber mais</a>
          </p>
        </div>
        <button type="button" onClick={() => setShow(false)} title="Fechar" aria-label="Fechar aviso" className="sx-46">{I.close}</button>
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
                  <a href="#conteudo-principal" title="Leia mais" className="sx-53">
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
          <button key={i} type="button" onClick={() => setIdx(i)} title={`Destaque ${i + 1}`} aria-label={`Ir para destaque ${i + 1}`} aria-current={i === idx ? "true" : undefined}

           className={`sx-55 carousel-dot ${i === idx ? "carousel-dot-active" : "carousel-dot-idle"}`}/>
        ))}
      </div>
      {/* Arrows */}
      <button type="button" aria-label="Destaque anterior" title="Anterior" onClick={() => setIdx(i => (i - 1 + SLIDER_ITEMS.length) % SLIDER_ITEMS.length)}
         className="sx-56 carousel-arrow">
        {I.chevLeft}
      </button>
      <button type="button" aria-label="Próximo destaque" title="Próximo" onClick={() => setIdx(i => (i + 1) % SLIDER_ITEMS.length)}
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
  const [tab, setTab] = useState<QuickAccessCategory>(QUICK_ACCESS_TABS[0].key);
  const activeTab = QUICK_ACCESS_TABS.find((item) => item.key === tab) ?? QUICK_ACCESS_TABS[0];

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
            {QUICK_ACCESS_TABS.map(({ key, label }) => (
              <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => setTab(key)} title={label}
                 className={`sx-66 ${tab === key ? "tab-pill-active" : "tab-pill-idle"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="quick-service-grid">
          {activeTab.items.map(s => (
            <a key={s} {...getPortalLinkProps(s)} title={s}

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
              <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} title={labels[k]}
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
                    <a href="#conteudo-principal" title={r.num} className="sx-82">{r.num}</a>
                  </td>
                  <td  className="sx-83">
                    <a href="#conteudo-principal" title={r.desc} className="gray-hover-text sx-84">{r.desc}</a>
                  </td>
                  <td  className="sx-85">{r.date}</td>
                  <td  className="sx-86"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <a href="#conteudo-principal" title={`Ver mais ${labels[tab]}`} className="more-link">
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
  const visibleNews = NOTICIAS.slice(0, 6);

  return (
    <section  className="py-14 sx-88">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p  className="sx-89">Comunicação</p>
            <h2  className="sx-90 section-title">Notícias</h2>
          </div>
        </div>
        <div className="news-grid">
          {visibleNews.map((n, i) => (
            <button key={n.title} type="button" onClick={() => onSelectNoticia(i)} title={n.title}

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
        <div className="text-center mt-8">
          <button type="button" onClick={onOpenNoticias} title="Ver mais notícias" className="sx-101 more-link">
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
            <button type="button" role="tab" aria-selected={tab === "fotos"} onClick={() => setTab("fotos")} title="Fotos" className={`sx-72 ${tab === "fotos" ? "tab-pill-active" : "tab-pill-idle"}`}>
              Fotos
            </button>
            <button type="button" role="tab" aria-selected={tab === "videos"} onClick={() => setTab("videos")} title="Vídeos" className={`sx-72 ${tab === "videos" ? "tab-pill-active" : "tab-pill-idle"}`}>
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
          <a href="#conteudo-principal" title="Galeria de Fotos" className="more-link">
            {I.photo} Ver Galeria de Fotos
          </a>
          <a href="#conteudo-principal" title="Galeria de Vídeos" className="more-link">
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
          <button type="button" onClick={prevPage} title="Anterior" className="secretarias-nav secretarias-nav-left carousel-arrow" aria-label="Secretarias anteriores">
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
                    <p><span aria-hidden="true">{I.phone}</span><a href={`tel:${s.tel}`} title="Telefone">{s.tel}</a></p>
                    <p><span aria-hidden="true">{I.mail}</span><a href={`mailto:${s.email}`} title="E-mail">{s.email}</a></p>
                  </div>
                  <button type="button" onClick={() => onSelectSecretaria(s.slug)} title="Ver perfil" className="secretaria-profile more-link">
                    Ver perfil
                  </button>
                </div>
              </article>
            ))}
            </div>
          </div>
          <button type="button" onClick={nextPage} title="Próximo" className="secretarias-nav secretarias-nav-right carousel-arrow" aria-label="Próximas secretarias">
            {I.chevRight}
          </button>
        </div>
        <div className="secretarias-dots" aria-label="Páginas do carrossel de secretarias">
          {SECRETARIA_DETAILS.map((_, i) => (
            <button key={i} type="button" onClick={() => setIdx(i)} title={`Secretaria ${i + 1}`} className={`carousel-dot ${i === activeDot ? "carousel-dot-active" : "carousel-dot-idle"}`} aria-label={`Ir para secretaria ${i + 1}`} />
          ))}
        </div>
        <div className="text-center mt-6">
          <button type="button" onClick={onOpenDirectory} title="Ver mais secretarias" className="more-link">
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
              <button type="button" onClick={() => setMonth(m => Math.max(0, m - 1))} title="Mês anterior" className="sx-136">
                {I.chevLeft}
              </button>
              <span  className="sx-137">{months[month]} 2026</span>
              <button type="button" onClick={() => setMonth(m => Math.min(11, m + 1))} title="Próximo mês" className="sx-138">
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
                <a key={ev.day} href="#conteudo-principal" title={ev.title} className="gray-hover-card sx-147">
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
        <a href="#conteudo-principal" title="Ver todos os eventos" className="more-link calendar-more-link">
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
            <a key={it.lbl} {...getPortalLinkProps(it.lbl)} title={it.lbl}

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
              {Object.values(SOCIAL_LINKS).map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.title}

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
                <button type="submit" title="Cadastrar"
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
              title={point.name}
              aria-label={`Ver informações sobre ${point.name}`}
            >
              <span />
            </button>
          ))}
          {activePoint && (
            <article className="tourism-map-info-card" aria-live="polite">
              <button type="button" className="tourism-map-close" onClick={() => setActivePoint(null)} title="Fechar" aria-label="Fechar informações">
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
                  <a href="#conteudo-principal" title="Como chegar" className="site-action-button button-yellow">Como chegar</a>
                  <a href="#conteudo-principal" title="Compartilhar" className="site-action-button-muted">Compartilhar</a>
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
                { icon: I.phone, label: "Central de Atendimento", val: CONTACT_INFO.phone, href: CONTACT_INFO.phoneHref, title: "Telefone" },
                { icon: I.mail, label: "E-mail institucional", val: CONTACT_INFO.email, href: CONTACT_INFO.emailHref, title: "E-mail" },
                { icon: I.map, label: "Endereço", val: CONTACT_INFO.fullAddress, href: CONTACT_INFO.mapUrl, title: "Localização" },
                { icon: I.clock, label: "Horário de atendimento", val: CONTACT_INFO.businessHours },
              ].map(({ icon, label, val, href, title }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div  className="sx-185">{icon}</div>
                  <div>
                    <div  className="sx-186">{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} title={title} className="sx-187">{val}</a>
                    ) : (
                      <div  className="sx-187">{val}</div>
                    )}
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
                <a key={lbl} href="#conteudo-principal" title={lbl}

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
              <button type="button" title="Enviar mensagem" className="sx-197 button-yellow">
                Enviar mensagem
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onOpenAccessibility }: { onOpenAccessibility: () => void }) {
  const COLS = [
    { title: "A Prefeitura", links: ["História do Município", "Galeria de Prefeitos", "Estrutura Organizacional", "Secretarias Municipais", "Câmara Municipal", "Plano Diretor"] },
    { title: "Serviços Online", links: ["2ª Via IPTU / Taxas", "Quitação Dívida Ativa", "ITBI", "NFS-e", "ISS Online", "RH Online", "Veracidade do Holerite", "Acessa SP"] },
    { title: "Cidadão", links: ["Portal da Transparência", "SIC - Acesso à Informação", "Ouvidoria Municipal", "Banco do Povo Paulista", "Junta Militar"] },
    { title: "Empresa", links: ["Cadastro Inscrição Municipal", "ISS Online", "NFS-e", "Licitações", "Portal de Compras", "Sebrae"] },
  ];

  return (
    <footer id="rodape-portal" className="pt-14 pb-4 sx-198" tabIndex={-1}>
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
                { icon: I.clock, val: CONTACT_INFO.businessHours },
                { icon: I.map, val: CONTACT_INFO.addressWithCep, href: CONTACT_INFO.mapUrl, title: "Localização" },
                { icon: I.phone, val: CONTACT_INFO.phone, href: CONTACT_INFO.phoneHref, title: "Telefone" },
                { icon: I.mail, val: CONTACT_INFO.email, href: CONTACT_INFO.emailHref, title: "E-mail" },
              ].map(({ icon, val, href, title }) => (
                <div key={val} className="flex gap-2 items-start">
                  <span  className="sx-202">{icon}</span>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} title={title} className="sx-203">{val}</a>
                  ) : (
                    <span  className="sx-203">{val}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              {Object.values(SOCIAL_LINKS).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.title} className="social-icon-link">{s.icon}</a>
              ))}
            </div>
            <a href={CONTACT_INFO.mapUrl} target="_blank" rel="noreferrer" title="Localização" className="hover:text-white sx-205">
              {I.map} Ver Localização
            </a>
            <a href={CONTACT_INFO.webmailUrl} target="_blank" rel="noreferrer" title="Webmail" className="hover:text-white sx-206">
              ✉ Webmail / Portal do Servidor
            </a>
          </div>

          {COLS.map(({ title, links }) => (
            <div key={title}>
              <h4  className="sx-207">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l}>
                    <a {...getPortalLinkProps(l)} title={l} className="hover:text-white sx-208">{l}</a>
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
                CNPJ: {CONTACT_INFO.cnpj} - Copyright {new Date().getFullYear()} - Prefeitura Municipal de Roseira - SP. Todos os direitos reservados.
              </p>
              <p  className="sx-211">
                Versão do sistema: 2.0.0 · Portal atualizado em: {new Date().toLocaleDateString("pt-BR")} · Gerenciado pelo Departamento de TI
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Termos e Condições de Uso", "Políticas de Cookies", "LGPD - Proteção de Dados", "Mapa do Site"].map(l => (
                <a key={l} href="#conteudo-principal" title={l} className="hover:text-white/60 sx-212">{l}</a>
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
              <a href="#conteudo-principal" title="Política de Cookies" className="sx-216">Política de Cookies</a> e{" "}
              <a href="#conteudo-principal" title="LGPD" className="sx-217">LGPD</a>.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap flex-shrink-0">
            <button type="button" onClick={() => setModal(true)} title="Personalizar" className="sx-218">
              Personalizar
            </button>
            <button type="button" onClick={() => setShow(false)} title="Rejeitar" className="sx-219">
              Rejeitar
            </button>
            <button type="button" onClick={() => setShow(false)} title="Aceitar todos" className="sx-220">
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
                  <button type="button" onClick={() => setPerf(!perf)} title={lbl} role="switch" aria-checked={perf} aria-label={lbl}
                     className="sx-228">
                    <span className="sx-229" style={{ left: perf ? "21px" : "3px" }}/>
                  </button>
                )}
              </div>
            ))}
            <div className="flex gap-3 mt-5">
              <button type="button" onClick={() => { setModal(false); setShow(false); }} title="Salvar preferências" className="sx-230">
                Salvar preferências
              </button>
              <button type="button" onClick={() => setModal(false)} title="Cancelar" className="sx-231">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// APP
// -----------------------------------------------------------------------------
const PAGE_PATHS: Record<AppPage, string> = {
  home: "/",
  "historia-roseira": "/historia",
  contato: "/contato",
  "fale-conosco": "/contato/fale-conosco",
  concursos: "/concursos",
  "concurso-detail": "/concursos",
  licitacoes: "/licitacoes/licitacoes",
  "licitacao-detail": "/licitacoes/detalhe",
  "leis-municipais": "/legislacao/leis-municipais",
  "lei-detail": "/legislacao/leis-municipais/detalhe",
  decretos: "/legislacao/decretos",
  "decreto-detail": "/legislacao/decretos/detalhe",
  portarias: "/legislacao/portarias",
  "portaria-detail": "/legislacao/portarias/detalhe",
  noticias: "/noticias",
  "ultimas-noticias": "/noticias/ultimas-noticias",
  "noticia-detail": "/noticias/detalhe",
  secretarias: "/secretarias",
  "secretaria-detail": "/secretarias/detalhe",
  faq: "/servicos/perguntas-frequentes",
  accessibility: "/acessibilidade",
  "requirement-page": "/servicos/requisito",
};

function pageFromPath(pathname: string): AppPage {
  const exactPage = Object.entries(PAGE_PATHS).find(([, path]) => path === pathname)?.[0] as AppPage | undefined;
  if (exactPage) return exactPage;
  if (pathname.startsWith("/contato/") && pathname !== "/contato/fale-conosco") return "requirement-page";
  if (pathname === "/noticias/ultimas-noticias") return "ultimas-noticias";
  if (pathname.startsWith("/noticias/") && pathname !== "/noticias/detalhe") return "requirement-page";
  if (pathname.startsWith("/licitacoes/") && pathname !== "/licitacoes/detalhe") {
    const slug = requirementSlugFromPath(pathname);
    if (LICITACOES_PAGE_CONFIGS[slug]) return "licitacoes";
    return "requirement-page";
  }
  if (pathname.startsWith("/legislacao/")) {
    const slug = legislacaoSpecialSlugFromPath(pathname);
    if (LEGISLACAO_ESPECIAL[slug]) return pathname.endsWith("/detalhe") ? "legislacao-special-detail" : "legislacao-special";
  }
  if (pathname === "/servicos/educacao" || pathname === "/servicos/educação") return "secretaria-detail";
    if (pathname.startsWith("/secretarias/") && pathname !== "/secretarias/detalhe") {
    const slug = secretariaSlugFromPath(pathname);
    return SECRETARIA_DETAILS.some(secretaria => secretaria.slug === slug) ? "secretaria-detail" : "requirement-page";
  }
  if (pathname.startsWith("/prefeitura/") || pathname.startsWith("/servicos/") || pathname.startsWith("/transparencia/") || pathname.startsWith("/legislacao/")) {
    return "requirement-page";
  }
  return "home";
}

function requirementSlugFromPath(pathname: string) {
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).pop() ?? "");
  return slug || "portal-transparencia";
}
function legislacaoSpecialSlugFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts[1] === "detalhe" ? parts[0] : parts[1] ?? "codigo-tributario";
}

function licitacoesSlugFromPath(pathname: string) {
  const slug = requirementSlugFromPath(pathname);
  return ["em-aberto", "encerradas"].includes(slug) ? "licitacoes" : slug;
}

function requirementPath(slug: string) {
  const section = NAV_ITEMS.find(item => item.children.some(child => NAVIGATION_REQUIREMENT_SLUGS[child] === slug))?.label;
  const prefix = section === "A Prefeitura" ? "prefeitura" : section === "Secretarias" ? "secretarias" : section === "Notícias" ? "noticias" : section === "Licitações" ? "licitacoes" : section === "Transparência" ? "transparencia" : section === "Legislação" ? "legislacao" : section === "Contato" ? "contato" : "servicos";
  return `/${prefix}/${encodeURIComponent(slug)}`;
}

function secretariaSlugFromPath(pathname: string) {
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).pop() ?? "");
  const aliases: Record<string, string> = { "turismo-e-cultura": "turismo-cultura", "secretaria-de-turismo-e-cultura": "turismo-cultura", "secretaria-de-meio-ambiente": "meio-ambiente" };
  return aliases[slug] ?? slug;
}

const REQUIREMENT_PAGE_COMPONENTS: Record<string, typeof RequirementPageExternal> = {
  "ouvidoria": OuvidoriaPage,
  "e-sic": EsicPage,
  "endereco-telefones": EnderecoTelefonesPage,
  "horarios-atendimento": HorariosAtendimentoPage,
  "mapa-localizacao": MapaLocalizacaoPage,
  "redes-sociais": RedesSociaisPage,
  "codigo-tributario": CodigoTributarioPage,
  "plano-diretor": PlanoDiretorPage,
  "lei-organica-municipal": LeiOrganicaMunicipalPage,
  "em-aberto": LicitacoesAbertasPage,
  "encerradas": LicitacoesEncerradasPage,
  "concorrencia-publica": ConcorrenciaPublicaPage,
  "chamada-publica": ChamadaPublicaPage,
  "pregao-presencial": PregaoPresencialPage,
  "tomada-de-precos": TomadaPrecosPage,
  "leilao": LeilaoPage,
  "dispensas-inexigibilidades": DispensasInexigibilidadesPage,
  "contratos": ContratosLicitacoesPage,
  "aditivos": AditivosPage,
  "atas-registro-precos": AtasRegistroPrecosPage,
  "fornecedores": FornecedoresPage,
  "pncp": PncpPage,
  "comunicados": ComunicadosPage,
  "eventos": AgendaEventosPage,
  "campanhas": CampanhasPage,
  "boletins-oficiais": BoletinsOficiaisPage,
  "carta-servicos": CartaServicosPage,
  "servicos-cidadao": ServicosCidadaoPage,
  "servicos-empresa": ServicosEmpresaPage,
  "servicos-servidor": ServicosServidorPage,
  "protocolos": ProtocolosPage,
  "emissao-guias": EmissaoGuiasPage,
  "iptu": IptuPage,
  "divida-ativa": DividaAtivaPage,
  "itbi": ItbiPage,
  "nota-fiscal-eletronica": NotaFiscalEletronicaPage,
  "cadastro-inscricao-municipal": CadastroInscricaoMunicipalPage,
  "bolsa-familia": BolsaFamiliaPage,
  "banco-povo": BancoPovoPage,
  "acessa-sp": AcessaSpPage,
  "conselho-tutelar": ConselhoTutelarPage,
  "junta-militar": JuntaMilitarPage,
  "covid": CovidPage,
  "portal-educacao": PortalEducacaoPage,
  "plano-arborizacao": PlanoArborizacaoPage,
  "centro-esterilizacao": CentroEsterilizacaoPage,
  "lei-aldir-blanc": LeiAldirBlancPage,
  "vagas-emprego": VagasEmpregoPage,
  "agendamento": AgendamentoPage,
  "prefeito-vice": PrefeitoVicePage,
  gabinete: GabinetePage,
  "estrutura-administrativa": EstruturaAdministrativaPage,
  "telefones-enderecos": TelefonesEnderecosPage,
  "horario-atendimento": HorarioAtendimentoPage,
  "símbolos-municipais": SimbolosMunicipaisPage,
  "conselhos-municipais": ConselhosMunicipaisPage,
  "mapa-site": MapaSitePage,
  "galeria-fotos": GaleriaFotosPage,
  "termos-uso": TermosUsoPage,
  "politica-cookies": PoliticaCookiesPage,
  lgpd: LgpdPage,
};

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [page, setPage] = useState<AppPage>(() => pageFromPath(window.location.pathname));
  const [activeNoticiaIndex, setActiveNoticiaIndex] = useState(0);
  const [activeLicitacaoIndex, setActiveLicitacaoIndex] = useState(0);
  const [activeConcursoIndex, setActiveConcursoIndex] = useState(0);
  const [activeLicitacaoSlug, setActiveLicitacaoSlug] = useState(() => licitacoesSlugFromPath(window.location.pathname));
  const [activeLeiIndex, setActiveLeiIndex] = useState(0);
  const [activeDecretoIndex, setActiveDecretoIndex] = useState(0);
  const [activePortariaIndex, setActivePortariaIndex] = useState(0);
  const [activeLegislacaoSpecialSlug, setActiveLegislacaoSpecialSlug] = useState(() => legislacaoSpecialSlugFromPath(window.location.pathname));
  const [activeLegislacaoSpecialIndex, setActiveLegislacaoSpecialIndex] = useState(0);
  const [activeSecretariaSlug, setActiveSecretariaSlug] = useState(() => secretariaSlugFromPath(window.location.pathname) || SECRETARIA_DETAILS[0].slug);
  const [activeRequirementSlug, setActiveRequirementSlug] = useState(() => requirementSlugFromPath(window.location.pathname));

  const fontScale = fontSize / 100;

  useEffect(() => {
    const root = appRef.current;
    applyAccessibleFontScale(root, fontScale);

    if (!root || typeof MutationObserver === "undefined") return undefined;

    const observer = new MutationObserver(() => {
      applyAccessibleFontScale(root, fontScale);
    });

    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [fontScale, page, menuOpen, activeNoticiaIndex, activeLicitacaoIndex, activeLicitacaoSlug, activeLeiIndex, activeDecretoIndex, activePortariaIndex, activeSecretariaSlug, activeRequirementSlug]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (!event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === "a" || key === "d" || key === "n") {
        event.preventDefault();
        if (key === "a" && !event.shiftKey) setFontSize(current => clampFontScale(current + FONT_SCALE_STEP));
        if (key === "d" && event.shiftKey) setFontSize(current => clampFontScale(current - FONT_SCALE_STEP));
        if (key === "n" && !event.shiftKey) setFontSize(100);
        return;
      }
      if (key === "h" && !event.shiftKey) { event.preventDefault(); navigate("home"); return; }
      if (key === "9" && !event.shiftKey) { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      if (key === "c" && !event.shiftKey) { event.preventDefault(); document.getElementById("conteudo-principal")?.focus(); return; }
      if (event.shiftKey && key === "1") { event.preventDefault(); navigate("accessibility"); return; }
      if (!event.shiftKey || !["1", "2", "3", "4"].includes(key)) return;
      event.preventDefault();
      const shortcutTargets: Record<string, string> = { "2": "menu-principal", "3": "busca-portal", "4": "rodape-portal" };
      const target = document.getElementById(shortcutTargets[key]);
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const navigate = (nextPage: AppPage) => {
    setPage(nextPage);
    if (window.location.pathname !== PAGE_PATHS[nextPage]) window.history.pushState({ page: nextPage }, "", PAGE_PATHS[nextPage]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = pageFromPath(window.location.pathname);
      setPage(nextPage);
       if (nextPage === "requirement-page") setActiveRequirementSlug(requirementSlugFromPath(window.location.pathname));
      if (nextPage === "licitacoes") setActiveLicitacaoSlug(licitacoesSlugFromPath(window.location.pathname));
      if (nextPage === "legislacao-special" || nextPage === "legislacao-special-detail") setActiveLegislacaoSpecialSlug(legislacaoSpecialSlugFromPath(window.location.pathname));
      if (nextPage === "secretaria-detail") setActiveSecretariaSlug(secretariaSlugFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (page !== "secretaria-detail") return;
    const slug = secretariaSlugFromPath(window.location.pathname);
    const secretaria = SECRETARIA_DETAILS.find((item) => item.slug === slug);
    if (!secretaria) return;
    setActiveSecretariaSlug(secretaria.slug);
    const canonicalPath = "/secretarias/" + encodeURIComponent(secretaria.slug);
    if (window.location.pathname !== canonicalPath) window.history.replaceState({ page: "secretaria-detail", slug: secretaria.slug }, "", canonicalPath);
  }, [page]);
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
  const openConcurso = (index: number) => {
    setActiveConcursoIndex(index);
    navigate("concurso-detail");
  };
  const openLegislacaoSpecial = (slug: string, index = 0, detail = false) => {
    setActiveLegislacaoSpecialSlug(slug);
    setActiveLegislacaoSpecialIndex(index);
    const path = `/legislacao/${slug}`;
    window.history.pushState({ page: detail ? "legislacao-special-detail" : "legislacao-special", slug }, "", path);
    setPage(detail ? "legislacao-special-detail" : "legislacao-special");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openSecretaria = (slug: string) => {
    if (slug === "cadastro-inscricao-municipal") {
      openRequirement(slug);
      return;
    }
    setActiveSecretariaSlug(slug);
    const friendlyPath = `/secretarias/${encodeURIComponent(slug)}`;
    if (window.location.pathname !== friendlyPath) window.history.pushState({ page: "secretaria-detail", slug }, "", friendlyPath);
    setPage("secretaria-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openRequirement = (slug: string) => {
    setActiveRequirementSlug(slug);
    const friendlyPath = requirementPath(slug);
    if (window.location.pathname !== friendlyPath || window.location.hash) window.history.pushState({ page: "requirement-page", slug }, "", friendlyPath);
    setPage("requirement-page");
  };
  const searchResults = useMemo<SearchResult[]>(() => {
    const openExternal = (url: string) => {
      window.open(url, "_blank", "noreferrer");
    };

    const navigationResults: SearchResult[] = [
      { title: "Início", category: "Página", description: "Página inicial do portal", keywords: "home prefeitura roseira", action: () => navigate("home") },
      { title: "História de Roseira", category: "Página", description: "História do município", keywords: "prefeitura municipio cidade", action: () => navigate("historia-roseira") },
      { title: "Fale Conosco", category: "Página", description: "Canais de atendimento e formulário de contato", keywords: "contato email telefone endereco atendimento", action: () => navigate("contato") },
      { title: "Concursos", category: "Página", description: "Concursos e processos seletivos públicos", keywords: "processo seletivo edital candidatos", action: () => navigate("concursos") },
      { title: "Licitações", category: "Página", description: "Editais, processos e compras públicas", keywords: "compras contratos fornecedores pncp", action: () => navigate("licitacoes") },
      { title: "Leis Municipais", category: "Página", description: "Consulta de leis municipais", keywords: "legislacao normas atos", action: () => navigate("leis-municipais") },
      { title: "Decretos", category: "Página", description: "Consulta de decretos municipais", keywords: "legislacao normas atos", action: () => navigate("decretos") },
      { title: "Portarias", category: "Página", description: "Consulta de portarias municipais", keywords: "nomeacoes atos administrativos", action: () => navigate("portarias") },
      { title: "Notícias", category: "Página", description: "Comunicados, campanhas e notícias oficiais", keywords: "ultimas noticias eventos comunicados", action: () => navigate("noticias") },
      { title: "Secretarias Municipais", category: "Página", description: "Diretório de secretarias e departamentos", keywords: "departamentos diretorias responsaveis", action: () => navigate("secretarias") },
      { title: "Perguntas Frequentes", category: "Página", description: "Dúvidas recorrentes sobre serviços municipais", keywords: "faq duvidas atendimento", action: () => navigate("faq") },
      { title: "Acessibilidade", category: "Página", description: "Recursos de acessibilidade e atalhos do portal", keywords: "acessibilidade emag atalhos libras contraste", action: () => navigate("accessibility") },
      { title: "Portal da Transparência", category: "Link externo", description: "Receitas, despesas e contratos públicos", keywords: "transparencia geosiap contas publicas", action: () => openExternal(CONTACT_INFO.transparencyPortalUrl), externalUrl: CONTACT_INFO.transparencyPortalUrl },
      { title: "Webmail", category: "Link externo", description: "Acesso ao webmail institucional", keywords: "servidor email hostinger", action: () => openExternal(CONTACT_INFO.webmailUrl), externalUrl: CONTACT_INFO.webmailUrl },
      { title: "Instagram", category: "Rede social", description: "Perfil oficial da Prefeitura no Instagram", keywords: "rede social", action: () => openExternal(SOCIAL_LINKS.instagram.href), externalUrl: SOCIAL_LINKS.instagram.href },
      { title: "Facebook", category: "Rede social", description: "Página oficial da Prefeitura no Facebook", keywords: "rede social", action: () => openExternal(SOCIAL_LINKS.facebook.href), externalUrl: SOCIAL_LINKS.facebook.href },
      { title: "YouTube", category: "Rede social", description: "Canal oficial da Prefeitura no YouTube", keywords: "video videos rede social", action: () => openExternal(SOCIAL_LINKS.youtube.href), externalUrl: SOCIAL_LINKS.youtube.href },
    ];

    const requirementResults = Object.entries(REQUIREMENT_PAGES).map(([slug, item]) => ({
      title: item.title,
      category: item.category,
      description: item.subtitle,
      keywords: `${item.sourceLabel ?? ""} ${item.requiredElements.join(" ")} ${item.rows.flat().join(" ")}`,
      action: () => openRequirement(slug),
    }));

    const noticiaResults = NOTICIAS.map((item, index) => ({
      title: item.title,
      category: `Notícia - ${item.cat}`,
      description: item.desc,
      keywords: `${item.date} ${item.views}`,
      action: () => openNoticia(index),
    }));

    const licitacaoResults = LICITACOES.map((item, index) => ({
      title: `Licitação Nº ${item.num}`,
      category: "Licitação",
      description: item.desc,
      keywords: `${item.date} ${item.status}`,
      action: () => openLicitacao(index),
    }));

    const leiResults = LEGISLACAO.map((item, index) => ({
      title: `Lei Municipal Nº ${item.num}`,
      category: "Legislação",
      description: item.desc,
      keywords: `${item.date} ${item.status}`,
      action: () => openLei(index),
    }));

    const decretoResults = DECRETOS.map((item, index) => ({
      title: `Decreto Nº ${item.num}`,
      category: "Decreto",
      description: item.desc,
      keywords: `${item.date} ${item.status}`,
      action: () => openDecreto(index),
    }));

    const portariaResults = PORTARIAS.map((item, index) => ({
      title: `Portaria Nº ${item.num}`,
      category: "Portaria",
      description: item.desc,
      keywords: `${item.date} ${item.status}`,
      action: () => openPortaria(index),
    }));

    const secretariaResults = SECRETARIA_DETAILS.map((item) => ({
      title: item.nome,
      category: "Secretaria",
      description: item.summary,
      keywords: `${item.shortName} ${item.diretor} ${item.cargo} ${item.end} ${item.tel} ${item.email} ${item.sobre} ${item.competencias.join(" ")}`,
      action: () => openSecretaria(item.slug),
    }));

    return [
      ...navigationResults,
      ...requirementResults,
      ...noticiaResults,
      ...licitacaoResults,
      ...leiResults,
      ...decretoResults,
      ...portariaResults,
      ...secretariaResults,
    ];
  }, []);
  const activeNoticia = NOTICIAS[activeNoticiaIndex] ?? NOTICIAS[0];
  const activeLicitacao = LICITACOES[activeLicitacaoIndex] ?? LICITACOES[0];
  const activeLei = LEGISLACAO[activeLeiIndex] ?? LEGISLACAO[0];
  const activeDecreto = DECRETOS[activeDecretoIndex] ?? DECRETOS[0];
  const activePortaria = PORTARIAS[activePortariaIndex] ?? PORTARIAS[0];
  const activeSecretaria = SECRETARIA_DETAILS.find((secretaria) => secretaria.slug === activeSecretariaSlug) ?? SECRETARIA_DETAILS[0];
  const activeRequirement = REQUIREMENT_PAGES[activeRequirementSlug] ?? REQUIREMENT_PAGES["portal-transparencia"];
  const ActiveRequirementPage = REQUIREMENT_PAGE_COMPONENTS[activeRequirementSlug] ?? RequirementPageExternal;

  return (
    <div ref={appRef} className={`sx-232 ${fontSize < 100 ? "font-scale-small" : fontSize > 100 ? "font-scale-large" : "font-scale-normal"} ${highContrast ? "high-contrast-mode" : ""}`}>
      <a href="#conteudo-principal" title="Pular para o conteúdo" className="skip-link">Pular para o conteúdo principal</a>
      <div className="site-header-fixed">
        <AccessBar fontSize={fontSize} setFontSize={setFontSize} highContrast={highContrast} setHighContrast={setHighContrast} onOpenAccessibility={() => navigate("accessibility")} />
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigateHome={() => navigate("home")} />
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPage={page} activeSecretariaSlug={activeSecretariaSlug} activeRequirementSlug={activeRequirementSlug} onNavigate={navigate} onOpenRequirement={openRequirement} onSelectSecretaria={openSecretaria} />
        <SearchBar results={searchResults} />
      </div>
      <VLibrasWidget />
      {page === "home" && <AlertBanner />}
      <main id="conteudo-principal" tabIndex={-1}>
        {page === "concursos" ? (
          <ConcursosPage onBackHome={() => navigate("home")} onSelectConcurso={openConcurso} />
        ) : page === "concurso-detail" ? (
          <ConcursoDetailPage item={CONCURSOS_PAGE_ITEMS[activeConcursoIndex] ?? CONCURSOS_PAGE_ITEMS[0]} onBackHome={() => navigate("home")} onBackList={() => navigate("concursos")} onSelectConcurso={openConcurso} />
        ) : page === "historia-roseira" ? (
          <HistoriaRoseiraPage onBackHome={() => navigate("home")} />
        ) : page === "contato" || page === "fale-conosco" ? (
          <ContatoPage onBackHome={() => navigate("home")} />
        ) : page === "licitacoes" ? (
          <LicitacoesPage licitacoes={LICITACOES} config={LICITACOES_PAGE_CONFIGS[activeLicitacaoSlug] ?? LICITACOES_PAGE_CONFIGS.licitacoes} onBackHome={() => navigate("home")} onSelectLicitacao={openLicitacao} />
        ) : page === "licitacao-detail" ? (
          <LicitacaoDetailPage licitacao={activeLicitacao} licitacoes={LICITACOES} config={LICITACOES_PAGE_CONFIGS[activeLicitacaoSlug] ?? LICITACOES_PAGE_CONFIGS.licitacoes} onBackHome={() => navigate("home")} onBackList={() => navigate("licitacoes")} onSelectLicitacao={openLicitacao} />
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
        ) : page === "legislacao-special" ? (
          <LeisMunicipaisPage leis={LEGISLACAO_ESPECIAL[activeLegislacaoSpecialSlug]?.leis ?? CODIGO_TRIBUTARIO} config={LEGISLACAO_ESPECIAL[activeLegislacaoSpecialSlug]?.config} onBackHome={() => navigate("home")} onSelectLei={(index) => openLegislacaoSpecial(activeLegislacaoSpecialSlug, index, true)} />
        ) : page === "legislacao-special-detail" ? (
          <LeiMunicipalDetailPage lei={(LEGISLACAO_ESPECIAL[activeLegislacaoSpecialSlug]?.leis ?? CODIGO_TRIBUTARIO)[activeLegislacaoSpecialIndex] ?? (LEGISLACAO_ESPECIAL[activeLegislacaoSpecialSlug]?.leis ?? CODIGO_TRIBUTARIO)[0]} leis={LEGISLACAO_ESPECIAL[activeLegislacaoSpecialSlug]?.leis ?? CODIGO_TRIBUTARIO} config={LEGISLACAO_ESPECIAL[activeLegislacaoSpecialSlug]?.config} onBackHome={() => navigate("home")} onBackList={() => openLegislacaoSpecial(activeLegislacaoSpecialSlug)} onSelectLei={(index) => openLegislacaoSpecial(activeLegislacaoSpecialSlug, index, true)} />
        ) : page === "noticias" || page === "ultimas-noticias" ? (
          <NoticiasPage noticias={NOTICIAS} onBackHome={() => navigate("home")} onSelectNoticia={openNoticia} />
        ) : page === "noticia-detail" ? (
          <NoticiaDetailPage noticia={activeNoticia} noticias={NOTICIAS} onBackHome={() => navigate("home")} onBackList={() => navigate("noticias")} onSelectNoticia={openNoticia} />
        ) : page === "secretarias" ? (
          <SecretariasDirectoryPage secretarias={SECRETARIA_DETAILS} onBackHome={() => navigate("home")} onSelectSecretaria={openSecretaria} />
        ) : page === "secretaria-detail" ? (
          <SecretariaDetailPage secretaria={activeSecretaria} noticias={NOTICIAS} onBackHome={() => navigate("home")} onBackList={() => navigate("secretarias")} />
        ) : page === "faq" ? (
          <FAQPageExternal onBackHome={() => navigate("home")} />
        ) : page === "accessibility" ? (
          <AccessibilityPageExternal onBackHome={() => navigate("home")} />
        ) : page === "requirement-page" ? (
          <ActiveRequirementPage page={activeRequirement} slug={activeRequirementSlug} onBackHome={() => navigate("home")} />
        ) : (
          <HomePage>
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
          </HomePage>
        )}
      </main>
      <Footer onOpenAccessibility={() => navigate("accessibility")} />
      <CookieBanner />
    </div>
  );
}
