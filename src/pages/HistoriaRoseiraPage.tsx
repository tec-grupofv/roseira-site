import { CalendarDays, Landmark, MapPin, TrainFront } from "lucide-react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";

const HISTORY_IMAGES = {
  station: "https://www.estacoesferroviarias.com.br/r/fotos/roseira0151.jpg",
  culture: "https://www.roseira.sp.gov.br/public/admin/globalarq/uploads/files/IMG_3925.JPG",
  matriz: "https://chaocaipira.org.br/wp-content/uploads/2024/10/igreja-matriz-roseira.jpg",
  monastery: "https://www.roseira.sp.gov.br/admin/globalarq/noticia/noticia/651_366/ce43c18f7f09b2e8eb19eb78acb85c01.jpeg",
  cityHall: "https://www.roseira.sp.gov.br/admin/globalarq/noticia/noticia/651_366/cf55a1f50949a2bec2c8996f18f0a62a.png",
};

const HISTORY_GALLERY = [
  {
    title: "Estação Ferroviária",
    text: "A ferrovia reposicionou o crescimento urbano e conectou Roseira aos fluxos do Vale do Paraíba.",
    image: HISTORY_IMAGES.station,
  },
  {
    title: "Igreja Matriz de Sant'Ana",
    text: "A Matriz permanece como referência religiosa, afetiva e urbana no centro da cidade.",
    image: HISTORY_IMAGES.matriz,
  },
  {
    title: "Mosteiro da Sagrada Face",
    text: "Um dos marcos religiosos de Roseira, integrado ao turismo de fé da região.",
    image: HISTORY_IMAGES.monastery,
  },
];

const HISTORY_TIMELINE = [
  { year: "Século XVIII", title: "Primeiros caminhos", text: "O território se formou nas rotas do antigo Caminho Real, com vida rural, religiosidade e passagem de viajantes." },
  { year: "1877", title: "A ferrovia chega", text: "A estação ferroviária impulsionou um novo núcleo urbano e aproximou Roseira dos centros regionais." },
  { year: "1910", title: "Matriz de Sant'Ana", text: "A construção da igreja consolidou uma centralidade comunitária que segue presente na paisagem da cidade." },
  { year: "1965", title: "Município instalado", text: "Roseira passou a organizar sua própria vida político-administrativa, fortalecendo serviços e identidade local." },
];

export default function HistoriaRoseiraPage({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="historia-page-view">
      <section className="site-internal-hero noticias-page-hero historia-page-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[
            { label: "Início", onClick: onBackHome },
            { label: "A Prefeitura" },
            { label: "História de Roseira" },
          ]} />

          <div className="noticias-page-hero-content historia-page-hero-content">
            <h1 className="site-title">História de Roseira</h1>
            <p className="site-subtitle">
              Uma cidade moldada por caminhos antigos, pela ferrovia, pela fé e pela vida comunitária do Vale do Paraíba.
            </p>
          </div>
        </div>
      </section>

      <section className="historia-immersive-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="historia-immersive-grid">
            <article className="historia-story-card">
              <span className="site-caps-title">Memória do Município</span>
              <h2 className="site-panel-title">Da Roseira Velha à cidade que cresceu junto aos trilhos</h2>
              <p className="site-text">
                A origem de Roseira está ligada às antigas rotas de passagem do Vale do Paraíba. O povoado se desenvolveu inicialmente na região de Roseira Velha, marcado pela religiosidade, pelas atividades rurais e pelo cotidiano de viajantes que cruzavam o Caminho Real.
              </p>
              <p className="site-text">
                Com a chegada da ferrovia em 1877, um novo centro urbano ganhou força. A estação aproximou famílias, comércio e serviços, criando uma paisagem em que memória ferroviária, igrejas, praças e vida pública se entrelaçam até hoje.
              </p>
            </article>

            <div className="historia-feature-image">
              <img src={HISTORY_IMAGES.culture} alt="Espaço Arte, Cultura e Turismo de Roseira" />
              <div>
                <strong className="site-card-title">Espaço Arte, Cultura e Turismo</strong>
                <span className="site-text">Memória preservada em um antigo prédio ferroviário.</span>
              </div>
            </div>
          </div>

          <div className="historia-stat-row" aria-label="Marcos históricos de Roseira">
            <article>
              <CalendarDays aria-hidden="true" />
              <strong>21 de março</strong>
              <span>Aniversário do município</span>
            </article>
            <article>
              <TrainFront aria-hidden="true" />
              <strong>1877</strong>
              <span>Inauguração da estação ferroviária</span>
            </article>
            <article>
              <Landmark aria-hidden="true" />
              <strong>1910</strong>
              <span>Construção da Matriz de Sant'Ana</span>
            </article>
          </div>

          <div className="historia-wide-image">
            <img src={HISTORY_IMAGES.cityHall} alt="Vista urbana e institucional de Roseira" />
            <div>
              <span className="site-caps-title">Identidade Roseirense</span>
              <h2 className="site-panel-title">Cidade de passagem, permanência e pertencimento</h2>
              <p className="site-text">
                Entre trilhos, igrejas, praças e caminhos rurais, Roseira preserva uma história que combina deslocamento, fé e relações de vizinhança.
              </p>
            </div>
          </div>

          <div className="historia-gallery-grid">
            {HISTORY_GALLERY.map((item) => (
              <article key={item.title} className="historia-gallery-card">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3 className="site-card-title">{item.title}</h3>
                  <p className="site-text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="historia-timeline-panel">
            <div className="historia-timeline-heading">
              <span className="site-caps-title">Linha do tempo</span>
              <h2 className="site-panel-title">Marcos que contam Roseira</h2>
            </div>
            <div className="historia-timeline">
              {HISTORY_TIMELINE.map((item) => (
                <article key={item.year} className="historia-timeline-item">
                  <strong>{item.year}</strong>
                  <div>
                    <h3 className="site-card-title">{item.title}</h3>
                    <p className="site-text">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <article className="historia-location-card">
            <MapPin aria-hidden="true" />
            <div>
              <span className="site-caps-title">Vale do Paraíba</span>
              <h2 className="site-panel-title">Um território entre caminhos históricos e turismo de fé</h2>
              <p className="site-text">
                A posição de Roseira entre municípios de forte tradição religiosa e histórica ajuda a explicar sua ligação com a Rota da Fé, com o Caminho Velho da Estrada Real e com as memórias da ferrovia.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
