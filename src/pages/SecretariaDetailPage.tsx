import { Clock, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { useState } from "react";
import type React from "react";
import type { Secretaria } from "../App";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

type SecretariaNews = { cat: string; date: string; views: number; title: string; desc: string; img: string };

type SecretariaDetailNavigation = {
  onBackHome: () => void;
  onBackList: () => void;
};

const isDeclared = (value: string) => value !== "Não declarado";

const initials = (name: string) => name
  .split(" ")
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0])
  .join("");

function ContactCard({ icon, label, value, helper }: { icon: React.ReactNode; label: string; value: string; helper?: string }) {
  return (
    <article className="secretaria-detail-contact-card">
      <span className="sx-185 secretaria-detail-contact-icon">{icon}</span>
      <div>
        <strong className="site-card-title">{label}</strong>
        <p className="site-text">{value}</p>
        {helper && <small className="site-text">{helper}</small>}
      </div>
    </article>
  );
}

export function SecretariasDirectoryPage({
  secretarias,
  onBackHome,
  onSelectSecretaria,
}: {
  secretarias: Secretaria[];
  onBackHome: () => void;
  onSelectSecretaria: (slug: string) => void;
}) {
  return (
    <div className="secretaria-detail-view">
      <section className="site-internal-hero secretaria-detail-hero secretaria-directory-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Secretarias e Departamentos" },
          ]} />
          <h1 className="site-title">Secretarias Municipais</h1>
          <p className="site-subtitle">Consulte informações, responsáveis, contatos e competências das áreas administrativas do município.</p>
        </div>
      </section>

      <section className="secretaria-directory-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="secretaria-directory-grid">
            {secretarias.map((secretaria) => (
              <button
                key={secretaria.slug}
                type="button"
                title={secretaria.nome}
                className="secretaria-directory-card"
                onClick={() => onSelectSecretaria(secretaria.slug)}
              >
                <span className="secretaria-directory-avatar">{initials(secretaria.shortName)}</span>
                <strong className="site-card-title">{secretaria.nome}</strong>
                <p className="site-text">{secretaria.summary}</p>
                <small className="site-card-title">Ver detalhes</small>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SecretariaDetailPage({
  secretaria,
  noticias,
  onBackHome,
  onBackList,
}: {
  secretaria: Secretaria;
  noticias: SecretariaNews[];
} & SecretariaDetailNavigation) {
  type SecretariaTab = "sobre" | "equipe" | "servicos" | "noticias" | "contato";
  const [activeTab, setActiveTab] = useState<SecretariaTab>("sobre");
  const newsCategory = secretaria.slug === "esporte" || secretaria.slug === "esporte-turismo-lazer" ? "Esportes" : secretaria.slug === "administracao" ? "Administração" : secretaria.shortName;
  const secretariaNoticias = noticias.filter((noticia) => noticia.cat.toLowerCase() === newsCategory.toLowerCase());
  const tabs: Array<{ key: SecretariaTab; label: string }> = [
    { key: "sobre", label: "Sobre a Secretaria" },
    { key: "equipe", label: "Equipe" },
    { key: "servicos", label: "Serviços (" + secretaria.competencias.length + ")" },
    { key: "noticias", label: "Notícias (" + secretariaNoticias.length + ")" },
    { key: "contato", label: "Fale Conosco" },
  ];

  return (
    <div className="secretaria-detail-view">
      <section className="site-internal-hero secretaria-detail-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Secretarias e Departamentos", onClick: onBackList },
            { label: secretaria.nome.replace("Diretoria de", "Secretaria de") },
          ]} />
          <div className="secretaria-detail-hero-row"><div><h1 className="site-title">{secretaria.nome}</h1><p className="site-subtitle">{secretaria.summary}</p></div></div>
        </div>
      </section>
      <section className="secretaria-detail-contacts"><div className="max-w-7xl mx-auto px-4"><div className="secretaria-detail-contact-grid"><ContactCard icon={<MapPin aria-hidden="true" />} label="Endereço" value={secretaria.end} /><ContactCard icon={<Clock aria-hidden="true" />} label="Horário de funcionamento" value={secretaria.horario} /><ContactCard icon={<Phone aria-hidden="true" />} label="Telefone" value={secretaria.tel} /><ContactCard icon={<Mail aria-hidden="true" />} label="E-mail" value={secretaria.email} /></div></div></section>
      <nav className="secretaria-detail-tabs" aria-label="Seções da secretaria"><div className="max-w-7xl mx-auto px-4">{tabs.map((tab) => <button key={tab.key} type="button" className={activeTab === tab.key ? "secretaria-detail-tab-active site-card-title" : "site-card-title"} aria-selected={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>)}</div></nav>
      <section className="secretaria-detail-main"><div className="max-w-7xl mx-auto px-4"><div className="secretaria-detail-layout"><aside className="secretaria-detail-sidebar"><article className="secretaria-detail-manager"><span className="site-caps-title">Titular da Secretaria</span><div><div className="secretaria-detail-manager-avatar">{isDeclared(secretaria.diretor) ? initials(secretaria.diretor) : <UserRound aria-hidden="true" />}</div><div><strong className="site-card-title">{secretaria.diretor}</strong><p className="site-text">{secretaria.cargo}</p></div></div><p className="site-text"><Mail aria-hidden="true" /> {secretaria.email}</p><p className="site-text"><Phone aria-hidden="true" /> {secretaria.tel}</p></article></aside><div className="secretaria-detail-content">
        {activeTab === "sobre" && <article className="secretaria-detail-panel" role="tabpanel"><h2 className="site-panel-title">Sobre a Secretaria</h2><p className="site-text">{secretaria.sobre}</p></article>}
        {activeTab === "equipe" && <article className="secretaria-detail-panel" role="tabpanel"><h2 className="site-panel-title">Equipe e responsável</h2><div className="requirement-table-wrap"><table className="requirement-table"><thead><tr><th>Nome</th><th>Cargo</th><th>Horário</th><th>Endereço</th><th>Telefone</th><th>E-mail</th></tr></thead><tbody><tr><td data-label="Nome">{secretaria.diretor}</td><td data-label="Cargo">{secretaria.cargo}</td><td data-label="Horário">{secretaria.horario}</td><td data-label="Endereço">{secretaria.end}</td><td data-label="Telefone">{secretaria.tel}</td><td data-label="E-mail">{secretaria.email}</td></tr></tbody></table></div></article>}
        {activeTab === "servicos" && <article className="secretaria-detail-panel" role="tabpanel"><h2 className="site-panel-title">Serviços da secretaria</h2><div className="requirement-table-wrap"><table className="requirement-table"><thead><tr><th>Serviço</th><th>Descrição</th><th>Como acessar</th><th>Responsável</th></tr></thead><tbody>{secretaria.competencias.map((competencia) => <tr key={competencia}><td data-label="Serviço">{competencia}</td><td data-label="Descrição">Orientações e atendimento relacionados à área.</td><td data-label="Como acessar">Presencial ou pelos canais oficiais.</td><td data-label="Responsável">{secretaria.diretor}</td></tr>)}</tbody></table></div></article>}
        {activeTab === "noticias" && <article className="secretaria-detail-panel secretaria-detail-news-panel" role="tabpanel"><h2 className="site-panel-title">Notícias da secretaria</h2>{secretariaNoticias.length === 0 ? <p className="site-text">Nenhuma notícia cadastrada para a categoria desta secretaria.</p> : <div className="secretaria-detail-news-list">{secretariaNoticias.map((noticia) => <article className="secretaria-detail-news-item" key={noticia.title}><div><span>{noticia.cat} · {noticia.date}</span><h3>{noticia.title}</h3><p className="site-text">{noticia.desc}</p></div><strong>{noticia.views} visualizações</strong></article>)}</div>}</article>}
        {activeTab === "contato" && <article className="secretaria-detail-panel" role="tabpanel"><h2 className="site-panel-title">Fale Conosco</h2><p className="site-text">Entre em contato com a secretaria pelos canais oficiais.</p><div className="secretaria-detail-contact-info"><p className="site-text"><MapPin aria-hidden="true" /> {secretaria.end}</p><p className="site-text"><Clock aria-hidden="true" /> {secretaria.horario}</p><p className="site-text"><Phone aria-hidden="true" /> {secretaria.tel}</p><p className="site-text"><Mail aria-hidden="true" /> {secretaria.email}</p></div></article>}
      </div></div></div></section>
    </div>
  );
}