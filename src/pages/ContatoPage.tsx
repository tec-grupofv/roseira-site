import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import type { PortalContact } from "../services/transparenciaApi";

const CONTACT_CHANNELS = [
  {
    icon: <Phone aria-hidden="true" />,
    title: "Telefone",
    text: "(12) 3646-9900",
    helper: "Atendimento em dias úteis",
  },
  {
    icon: <Mail aria-hidden="true" />,
    title: "E-mail",
    text: "contato@roseira.sp.gov.br",
    helper: "Canal institucional da Prefeitura",
  },
  {
    icon: <MapPin aria-hidden="true" />,
    title: "Endereço",
    text: "Praça Sant'Ana, 201 - Centro",
    helper: "Roseira/SP - CEP 12580-017",
  },
  {
    icon: <Clock aria-hidden="true" />,
    title: "Atendimento",
    text: "Segunda a sexta, das 8h às 17h",
    helper: "Exceto feriados e pontos facultativos",
  },
];

export default function ContatoPage({ onBackHome, contacts = [] }: { onBackHome: () => void; contacts?: PortalContact[] }) {
  const [sent, setSent] = useState(false);
  const channels = contacts.length
    ? contacts.filter((item) => item.descricao && (item.telefone !== "-" || item.email !== "-" || item.endereco !== "-")).slice(0, 8).map((item) => ({
      icon: <Phone aria-hidden="true" />,
      title: item.descricao?.trim() || "Contato institucional",
      text: [item.telefone?.trim(), item.email?.trim()].filter((value) => value && value !== "-").join(" · ") || "Consulte a Prefeitura",
      helper: [item.endereco?.trim(), item.horario?.trim()].filter((value) => value && value !== "-").join(" · "),
    }))
    : CONTACT_CHANNELS;

  return (
    <div className="contato-page-view">
      <section className="site-internal-hero noticias-page-hero contato-page-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "Contato" },
            { label: "Fale Conosco" },
          ]} />

          <div className="noticias-page-hero-content contato-page-hero-content">
            <h1 className="site-title">Fale com a Prefeitura</h1>
            <p className="site-subtitle">
              Envie sua mensagem, consulte os canais oficiais e encontre informações para atendimento presencial.
            </p>
          </div>
        </div>
      </section>

      <section className="contato-page-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="secretaria-detail-contact-grid contato-channel-grid contato-channel-grid-reference">
            {channels.map((item) => (
              <article key={item.title} className="secretaria-detail-contact-card contato-channel-card-reference">
                <span className="sx-185 secretaria-detail-contact-icon">{item.icon}</span>
                <div>
                  <strong className="site-card-title">{item.title}</strong>
                  <p className="site-text">{item.text}</p>
                  <small className="site-text">{item.helper}</small>
                </div>
              </article>
            ))}
          </div>

          <div className="contato-page-layout">
            <article className="contato-form-panel">
              <span className="site-caps-title">Mensagem</span>
              <h2 className="site-panel-title">Como podemos ajudar?</h2>
              {sent ? (
                <div className="contato-success-message">
                  <MessageCircle aria-hidden="true" />
                  <strong className="site-card-title">Mensagem enviada</strong>
                  <p className="site-text">Recebemos sua solicitação. A equipe responsável fará o atendimento pelo canal informado.</p>
                </div>
              ) : (
                <form
                  className="contato-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                >
                  <label>
                    <span className="site-caps-title">Nome</span>
                    <input type="text" name="nome" placeholder="Digite seu nome completo" required />
                  </label>
                  <label>
                    <span className="site-caps-title">E-mail</span>
                    <input type="email" name="email" placeholder="seuemail@exemplo.com" required />
                  </label>
                  <label>
                    <span className="site-caps-title">Assunto</span>
                    <select name="assunto" defaultValue="" required>
                      <option value="" disabled>Selecione o assunto</option>
                      <option>Informações gerais</option>
                      <option>Serviços municipais</option>
                      <option>Ouvidoria</option>
                      <option>Solicitação de atendimento</option>
                    </select>
                  </label>
                  <label>
                    <span className="site-caps-title">Mensagem</span>
                    <textarea name="mensagem" placeholder="Escreva sua mensagem" rows={6} required />
                  </label>
                  <button type="submit" className="sx-220 lgpd-yellow-button">
                    <Send aria-hidden="true" />
                    Enviar mensagem
                  </button>
                </form>
              )}
            </article>

            <aside className="contato-side-panel">
              <article>
                <span className="site-caps-title">Atendimento presencial</span>
                <h2 className="site-panel-title">Prefeitura Municipal de Roseira</h2>
                <p className="site-text">
                  Praça Sant'Ana, 201 - Centro, Roseira/SP. Atendimento de segunda a sexta-feira, das 8h às 17h.
                </p>
              </article>
              <article>
                <span className="site-caps-title">Canais digitais</span>
                <div className="contato-link-list">
                  <a href="#" className="site-card-title site-green-pill-button">Ouvidoria</a>
                  <a href="#" className="site-card-title site-green-pill-button">e-SIC</a>
                  <a href="#" className="site-card-title site-green-pill-button">Portal da Transparência</a>
                  <a href="#" className="site-card-title site-green-pill-button">Carta de Serviços</a>
                </div>
              </article>
              <div className="contato-map-preview">
                <iframe
                  title="Mapa de localização da Prefeitura Municipal de Roseira"
                  src="https://www.google.com/maps?q=Prefeitura%20Municipal%20de%20Roseira%20Pra%C3%A7a%20Sant%27Ana%20201%20Roseira%20SP&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
