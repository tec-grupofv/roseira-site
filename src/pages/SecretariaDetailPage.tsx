import { Clock, Mail, MapPin, Phone, Printer, Send, Share2, UserRound } from "lucide-react";
import type React from "react";
import type { Secretaria } from "../App";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

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
  onBackHome,
  onBackList,
}: {
  secretaria: Secretaria;
} & SecretariaDetailNavigation) {
  return (
    <div className="secretaria-detail-view">
      <section className="site-internal-hero secretaria-detail-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Secretarias e Departamentos", onClick: onBackList },
            { label: secretaria.nome.replace("Diretoria de", "Secretaria de") },
          ]} />
          <div className="secretaria-detail-hero-row">
            <div>
              <h1 className="site-title">{secretaria.nome}</h1>
              <p className="site-subtitle">{secretaria.summary}</p>
            </div>
            <div className="secretaria-detail-actions" aria-label="Ações da secretaria">
              <a href={isDeclared(secretaria.email) ? `mailto:${secretaria.email}` : "#"} className="site-action-button button-yellow">
                <Send aria-hidden="true" />
                Fale conosco
              </a>
              <button type="button" className="site-action-button site-action-button-muted">
                <Share2 aria-hidden="true" />
                Compartilhar
              </button>
              <button type="button" className="site-action-button site-action-button-muted">
                <Printer aria-hidden="true" />
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="secretaria-detail-contacts">
        <div className="max-w-7xl mx-auto px-4">
          <div className="secretaria-detail-contact-grid">
            <ContactCard icon={<MapPin aria-hidden="true" />} label="Endereço" value={secretaria.end} />
            <ContactCard icon={<Clock aria-hidden="true" />} label="Horário de funcionamento" value={secretaria.horario} />
            <ContactCard icon={<Phone aria-hidden="true" />} label="Telefone" value={secretaria.tel} />
            <ContactCard icon={<Mail aria-hidden="true" />} label="E-mail" value={secretaria.email} />
          </div>
        </div>
      </section>

      <nav className="secretaria-detail-tabs" aria-label="Seções da secretaria">
        <div className="max-w-7xl mx-auto px-4">
          <a href="#sobre-secretaria" className="secretaria-detail-tab-active site-card-title">Sobre a Secretaria</a>
          <a href="#contato-secretaria" className="site-card-title">Equipe (5)</a>
          <a href="#competencias" className="site-card-title">Serviços (6)</a>
          <a href="#noticias-secretaria" className="site-card-title">Notícias (2)</a>
          <a href="#contato-secretaria" className="site-card-title">Fale Conosco</a>
        </div>
      </nav>

      <section className="secretaria-detail-main">
        <div className="max-w-7xl mx-auto px-4">
          <div className="secretaria-detail-layout">
            <aside className="secretaria-detail-sidebar" id="contato-secretaria">
              <article className="secretaria-detail-manager" id="contato-secretaria">
                <span className="site-caps-title">Titular da Secretaria</span>
                <div>
                  <div className="secretaria-detail-manager-avatar">
                    {isDeclared(secretaria.diretor) ? initials(secretaria.diretor) : <UserRound aria-hidden="true" />}
                  </div>
                  <div>
                    <strong className="site-card-title">{secretaria.diretor}</strong>
                    <p className="site-text">{secretaria.cargo}</p>
                  </div>
                </div>
                <p className="site-text"><Mail aria-hidden="true" /> {secretaria.email}</p>
                <p className="site-text"><Phone aria-hidden="true" /> {secretaria.tel}</p>
              </article>
            </aside>

            <div className="secretaria-detail-content">
              <article id="sobre-secretaria" className="secretaria-detail-panel">
                <h2 className="site-panel-title">Sobre a Secretaria</h2>
                <p className="site-text">{secretaria.sobre}</p>
              </article>

              <article id="competencias" className="secretaria-detail-panel">
                <h2 className="site-panel-title">Competências</h2>
                <ul>
                  {secretaria.competencias.map((competencia) => (
                    <li key={competencia} className="site-text">{competencia}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
