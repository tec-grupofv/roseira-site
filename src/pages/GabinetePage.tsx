import { Clock, FileText, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { RequirementPageConfig } from "./RequirementPage";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

type GabineteTab = "visao-geral" | "competencias" | "responsavel" | "atendimento" | "documentos";
const tabs: Array<{ id: GabineteTab; label: string }> = [
  { id: "visao-geral", label: "Visão geral" }, { id: "competencias", label: "Competências" }, { id: "responsavel", label: "Responsável" }, { id: "atendimento", label: "Atendimento" }, { id: "documentos", label: "Documentos" },
];
function ContactCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <article className="secretaria-detail-contact-card gabinete-contact-card"><span className="sx-185 secretaria-detail-contact-icon">{icon}</span><div><strong className="site-card-title">{label}</strong><p className="site-text">{value}</p></div></article>; }
function EmptyState({ title, description }: { title: string; description: string }) { return <article className="secretaria-detail-panel gabinete-empty-state"><FileText aria-hidden="true" /><h2 className="site-panel-title">{title}</h2><p className="site-text">{description}</p></article>; }

export default function GabinetePage({ onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  const [activeTab, setActiveTab] = useState<GabineteTab>("visao-geral");
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label;
  return <div className="secretaria-detail-view gabinete-page-view">
    <section className="site-internal-hero secretaria-detail-hero gabinete-hero"><div className="max-w-7xl mx-auto px-4"><SiteBreadcrumb items={[{ label: "Início", onClick: onBackHome }, { label: "A Prefeitura" }, { label: "Gabinete" }]} /><div className="secretaria-detail-hero-row gabinete-hero-row"><div><h1 className="site-title">Gabinete</h1><p className="site-subtitle">Informações sobre competências, responsável, atendimento e documentos do Gabinete do Prefeito.</p></div></div></div></section>
    <section className="secretaria-detail-contacts gabinete-contacts"><div className="max-w-7xl mx-auto px-4"><div className="secretaria-detail-contact-grid"><ContactCard icon={<MapPin aria-hidden="true" />} label="Endereço" value="Não declarado" /><ContactCard icon={<Clock aria-hidden="true" />} label="Horário de atendimento" value="Não declarado" /><ContactCard icon={<Phone aria-hidden="true" />} label="Telefone" value="Não declarado" /><ContactCard icon={<Mail aria-hidden="true" />} label="E-mail" value="Não declarado" /></div></div></section>
    <nav className="secretaria-detail-tabs gabinete-tabs" aria-label="Seções do Gabinete"><div className="max-w-7xl mx-auto px-4">{tabs.map((tab) => <button key={tab.id} type="button" className={activeTab === tab.id ? "gabinete-tab-active site-card-title" : "site-card-title"} aria-selected={activeTab === tab.id} role="tab" onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</div></nav>
    <section className="secretaria-detail-main gabinete-main"><div className="max-w-7xl mx-auto px-4"><div className="secretaria-detail-layout"><aside className="secretaria-detail-sidebar"><article className="secretaria-detail-manager gabinete-manager"><span className="site-caps-title">Responsável pelo Gabinete</span><div><div className="secretaria-detail-manager-avatar"><UserRound aria-hidden="true" /></div><div><strong className="site-card-title">Não declarado</strong><p className="site-text">Chefe do Poder Executivo</p></div></div><p className="site-text"><Mail aria-hidden="true" /> Não declarado</p><p className="site-text"><Phone aria-hidden="true" /> Não declarado</p></article></aside><div className="secretaria-detail-content" role="tabpanel" aria-label={activeLabel}>
      {activeTab === "visao-geral" && <article className="secretaria-detail-panel"><h2 className="site-panel-title">Sobre o Gabinete</h2><p className="site-text">O Gabinete do Prefeito é a unidade responsável pelo apoio institucional, administrativo e político ao Chefe do Poder Executivo.</p><div className="gabinete-highlight-grid"><div><span className="site-caps-title">Unidade</span><strong>Gabinete do Prefeito</strong></div><div><span className="site-caps-title">Situação dos dados</span><strong>Informações oficiais pendentes</strong></div></div></article>}
      {activeTab === "competencias" && <EmptyState title="Competências do Gabinete" description="As atribuições detalhadas do Gabinete serão publicadas nesta seção após validação oficial." />}
      {activeTab === "responsavel" && <EmptyState title="Responsável" description="O nome, cargo e contato funcional do responsável serão publicados nesta seção após validação oficial." />}
      {activeTab === "atendimento" && <EmptyState title="Atendimento" description="O horário, endereço, telefone e e-mail institucionais serão publicados nesta seção após validação oficial." />}
      {activeTab === "documentos" && <EmptyState title="Documentos relacionados" description="Ainda não há documentos oficiais publicados para esta unidade." />}
    </div></div></div></section>
  </div>;
}
