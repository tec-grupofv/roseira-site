import { useState } from "react";
import type { RequirementPageConfig } from "./RequirementPage";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

type SymbolTab = "brasao" | "hino" | "bandeira" | "norma";
const tabs: Array<{ id: SymbolTab; label: string }> = [
  { id: "brasao", label: "Brasão" },
  { id: "hino", label: "Hino" },
  { id: "bandeira", label: "Bandeira" },
  { id: "norma", label: "Norma de instituição" },
];
const lyrics = [
  "Cidade histórica que nos faz orgulhar",
  "Muito aprazível enche os olhos da gente",
  "O teu passado é nobre e cheio de esplendor",
  "Ontem menina hoje amadurecestes",
  "Roseira o vale volta os olhos para ti",
  "pela grandeza deste povo que trabalha",
  "De sol a sol seja no campo ou na cidade",
  "Mostrando a todos que é com luta que se vence",
  "Tua gente é simples de alma pura e pulso forte",
  "Terra de encanto é sempre teu meu coração.",
  "Oh! cidade flor do vale com pé firme sempre caminharás.",
  "Oh! cidade flor do vale do meu coração jamais sairás.",
  "Quebra-cangalha e Mantiqueira que te cercam",
  "São testemunhas do progresso desta terra",
  "Do solo fértil traz a mesa o melhor pão",
  "São Paulo sempre se orgulhará de ti",
  "Tua estrada foi caminho do império",
  "Compondo a história do nosso grande Brasil",
  "Teu nome lembra o cheiro de uma linda flor",
  "Que era botão e hoje já desabrochou",
  "Teus bravos filhos buscam um grande futuro",
  "A ti Roseira terra amada e varonil.",
  "Oh! cidade flor do vale com pé firme sempre caminharás.",
  "Oh! cidade flor do vale do meu coração jamais sairás.",
];

function EmptySymbol({ title, description }: { title: string; description: string }) {
  return <article className="secretaria-detail-panel simbolo-empty-panel"><h2 className="site-panel-title">{title}</h2><p className="site-text">{description}</p></article>;
}

export default function SimbolosMunicipaisPage({ onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  const [activeTab, setActiveTab] = useState<SymbolTab>("brasao");
  return <div className="secretaria-detail-view simbolos-page-view">
    <section className="site-internal-hero secretaria-detail-hero simbolos-hero"><div className="max-w-7xl mx-auto px-4"><SiteBreadcrumb items={[{ label: "Início", onClick: onBackHome }, { label: "A Prefeitura" }, { label: "Símbolos Municipais" }]} /><div className="secretaria-detail-hero-row"><div><h1 className="site-title">Símbolos Municipais</h1><p className="site-subtitle">Brasão, bandeira, hino e normas dos símbolos oficiais do Município.</p></div></div></div></section>
    <nav className="secretaria-detail-tabs simbolos-tabs" aria-label="Seções dos símbolos municipais"><div className="max-w-7xl mx-auto px-4">{tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? "simbolo-tab-active site-card-title" : "site-card-title"} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</div></nav>
    <section className="secretaria-detail-main simbolos-main"><div className="max-w-7xl mx-auto px-4">{activeTab === "hino" ? <article className="secretaria-detail-panel hino-panel"><span className="site-caps-title">Hino de Roseira</span><h2 className="site-panel-title">Hino do Município</h2><div className="hino-lyrics">{lyrics.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}</div></article> : activeTab === "brasao" ? <EmptySymbol title="Brasão Municipal" description="O brasão oficial do Município será apresentado nesta seção com sua descrição e norma de instituição." /> : activeTab === "bandeira" ? <EmptySymbol title="Bandeira Municipal" description="A bandeira oficial do Município será apresentada nesta seção com suas cores, elementos e significado." /> : <EmptySymbol title="Norma de instituição" description="A legislação que institui e regulamenta os símbolos municipais será disponibilizada nesta seção." />}</div></section>
  </div>;
}
