import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FileText, Info, Landmark, Newspaper, ShieldCheck, UsersRound } from "lucide-react";
import ConcursosPage from "./pages/ConcursosPage";

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
    label: "Prefeitura",
    children: ["Telefones Úteis", "Diretores das Secretarias", "Publicações Oficiais", "História do Município", "Galeria de Prefeitos", "Hino Municipal"],
  },
  {
    label: "Secretarias",
    children: ["Administração", "Saúde", "Educação", "FUNDEB", "Esporte, Turismo e Lazer", "Meio Ambiente", "Assistência Social", "Finanças", "Obras e Infraestrutura", "Conselho Municipal de Educação", "Conselho de Alimentação Escolar"],
  },
  {
    label: "Cidade",
    children: ["Banco do Povo Paulista", "Bolsa Família", "Conselho Tutelar", "Junta Militar", "Calendário de Eventos", "Vagas de Emprego", "Plano de Arborização Urbana", "Centro de Esterilização de Animais"],
  },
  { label: "Setor de Projetos", children: [] },
  {
    label: "Compras Públicas",
    children: ["Licitações", "Portal de Compras", "Resultado de Licitações"],
  },
  { label: "Concursos", children: [] },
  { label: "Contas Públicas", children: [] },
  {
    label: "Serviços Online",
    children: ["2ª Via IPTU / Taxas Imobiliárias", "Quitação de Dívida Ativa", "ITBI", "Portal da Transparência", "Serviços ao Cidadão", "Audiências Públicas", "RH Online", "Veracidade do Holerite", "NFS-e", "ISS Online", "Acessa SP"],
  },
  {
    label: "Fale Conosco",
    children: ["Carta de Serviço ao Cidadão", "SIC - Acesso à Informação", "Ouvidoria Municipal", "Fale Conosco", "Perguntas Frequentes"],
  },
];

const LEGISLACAO = [
  { num: "2036-2026", desc: "Horário de funcionamento durante jogos da Seleção - Copa 2026", date: "25/06/2026", status: "Ativo" },
  { num: "2035-2026", desc: "Utilidade pública e desapropriação de imóvel - SABESP/EEE", date: "19/06/2026", status: "Ativo" },
  { num: "2034-2026", desc: "Altera Decreto nº 1804 - regularização fundiária de interesse social", date: "19/06/2026", status: "Ativo" },
  { num: "2032-2026", desc: "Convocação para plenária municipal de saúde", date: "16/06/2026", status: "Ativo" },
  { num: "2031-2026", desc: "Regulamenta o Fundo Municipal de Saneamento (FMSAI)", date: "15/06/2026", status: "Ativo" },
  { num: "2029-2026", desc: "Prorrogação das validades do Concurso Público nº 01/2023", date: "13/06/2026", status: "Ativo" },
];
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
  { nome: "Diretoria de Educação", diretor: "Leonaria Rodrigues de Sousa Corrêa", horario: "08h00 às 17h00", end: "Extensão da Praça Sant'Ana, 02 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "educacao@roseira.sp.gov.br" },
  { nome: "Secretaria de Assistência Social", diretor: "Fabiana Caltabiano de Souza Siqueira", horario: "07h30 às 16h00", end: "Rua Cel. Rodophiano de Barros, 97 - Centro - Roseira/SP", tel: "Não declarado", email: "psroseira@yahoo.com.br" },
  { nome: "Diretoria de Finanças", diretor: "Luiz Carlos Rodrigues", horario: "8h às 17h", end: "Praça Sant'Ana, 201 - Centro - Roseira/SP", tel: "(12) 3646-9900", email: "lcarlos@roseira.sp.gov.br" },
];

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
function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <div  className="sx-19">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div  className="sx-20">
            <img src="/prefeitura-de-roseira-logo.png" alt="Brasão da Prefeitura Municipal de Roseira" className="brand-logo" />
          </div>
          <div>
            <div  className="sx-21">Prefeitura Municipal</div>
            <div  className="sx-22">de Roseira - SP</div>
          </div>
        </div>

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
function NavBar({ menuOpen, setMenuOpen, onNavigate }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void; onNavigate: (page: "home" | "concursos") => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenIdx(null);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

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
                }}

                className={[openIdx === idx ? "bg-white/15" : "hover:bg-white/10", 'sx-35'].filter(Boolean).join(' ')}
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
// ÚLTIMAS PUBLICAÇÕES (tabs)
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
function Noticias() {
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
            <a key={`${n.title}-${i}`} href="#"

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
            </a>
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
          <a href="#" className="sx-101 more-link">
            Ver mais notícias {I.chevRight}
          </a>
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
function Secretarias() {
  const [idx, setIdx] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const [paused, setPaused] = useState(false);
  const secretariasTrack = Array.from({ length: 12 }, (_, offset) => SECRETARIAS[offset % SECRETARIAS.length]);
  const loopPoint = Math.max(1, secretariasTrack.length - 4);
  const activeDot = idx % SECRETARIAS.length;

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
                    <p><span aria-hidden="true">●</span>{s.diretor}</p>
                    <p><span aria-hidden="true">{I.clock}</span>{s.horario}</p>
                    <p><span aria-hidden="true">{I.map}</span>{s.end}</p>
                    <p><span aria-hidden="true">{I.phone}</span><a href={`tel:${s.tel}`}>{s.tel}</a></p>
                    <p><span aria-hidden="true">{I.mail}</span><a href={`mailto:${s.email}`}>{s.email}</a></p>
                  </div>
                  <a href="#" className="secretaria-profile more-link">
                    Ver perfil
                  </a>
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
          {SECRETARIAS.map((_, i) => (
            <button key={i} type="button" onClick={() => setIdx(i)} className={`carousel-dot ${i === activeDot ? "carousel-dot-active" : "carousel-dot-idle"}`} aria-label={`Ir para secretaria ${i + 1}`} />
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="#" className="more-link">
            Ver mais secretarias {I.chevRight}
          </a>
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
// TRANSPARÊNCIA
// -----------------------------------------------------------------------------
function Transparencia() {
  const items = [
    { lbl: "Portal da Transparência", desc: "Receitas, despesas e contratos públicos", Icon: ShieldCheck },
    { lbl: "Contas Públicas", desc: "Balanços e relatórios de execução orçamentária", Icon: Landmark },
    { lbl: "Licitações e Contratos", desc: "Editais, resultados e atas de sessão", Icon: FileText },
    { lbl: "Lei de Acesso à Informação", desc: "Solicite informações via e-SIC", Icon: Info },
    { lbl: "Diário Oficial", desc: "Atos e publicações da administração", Icon: Newspaper },
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
          {/* Social */}
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

          {/* Newsletter */}
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
                {/* Captcha simulation */}
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

// -----------------------------------------------------------------------------
// FOOTER
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// APP
// -----------------------------------------------------------------------------
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(0);
  const [page, setPage] = useState<"home" | "concursos">("home");

  const fontScale = fontSize === -1 ? 0.9 : fontSize === 1 ? 1.1 : 1;
  const navigate = (nextPage: "home" | "concursos") => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`sx-232 ${fontSize === -1 ? "font-scale-small" : fontSize === 1 ? "font-scale-large" : "font-scale-normal"}`}>
      <a href="#conteudo-principal" className="skip-link">Pular para o conteúdo principal</a>
      <div className="site-header-fixed">
        <AccessBar fontSize={fontSize} setFontSize={setFontSize} />
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={navigate} />
        <SearchBar />
      </div>
      {page === "home" && <AlertBanner />}
      <main id="conteudo-principal" tabIndex={-1}>
        {page === "concursos" ? (
          <ConcursosPage onBackHome={() => navigate("home")} />
        ) : (
          <>
            <HeroSlider />
            <AcessoRapido />
            <Noticias />
            <Publicacoes />
            <Galeria />
            <Secretarias />
            <CalendarioEventos />
            <Transparencia />
            <SocialNewsletter />
            <FaleConosco />
          </>
        )}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
