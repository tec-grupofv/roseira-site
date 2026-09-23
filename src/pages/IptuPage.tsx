import { useState } from "react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import type { RequirementPageConfig } from "./RequirementPage";

const FAQ_ITEMS = [
  { question: "Qual o dia de vencimento do IPTU 2021?", answer: "A Prefeitura Municipal de Roseira colocou o dia 10 de junho como data de vencimento da primeira parcela do IPTU de 2021." },
  { question: "Onde posso pagar o meu IPTU?", answer: "Os carnês podem ser pagos na Tesouraria da Prefeitura, na Agência da Caixa Econômica Federal, no Banco do Brasil e nas Casas Lotéricas." },
  { question: "Não sei onde guardei meu IPTU, como consigo a 2ª via?", answer: "Você pode conseguir a 2ª via das parcelas do seu IPTU no site da Prefeitura Municipal de Roseira.", link: "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/arrecadacao/2via/index.php" },
  { question: "Existe algum desconto para quem não possui débitos anteriores?", answer: "Sim. Existe desconto de 10% para quem efetuar o pagamento em parcela única e de 5% na opção de parcelamento." },
  { question: "Mesmo tendo débitos de anos anteriores, ainda consigo desconto no IPTU?", answer: "Sim. Para obter o desconto, é necessário dirigir-se à Tesouraria da Prefeitura Municipal de Roseira para quitar ou parcelar os débitos anteriores. Após o primeiro pagamento das parcelas atrasadas ou a quitação dos débitos, o carnê do IPTU terá desconto de 10% à vista ou 5% parcelado." },
];

export default function IptuPage({ onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <div className="requirement-page iptu-faq-page">
      <section className="site-internal-hero concursos-hero requirement-hero">
        <div className="max-w-7xl mx-auto px-4">
          <SiteBreadcrumb items={[{ label: "Início", onClick: onBackHome }, { label: "Serviços" }, { label: "IPTU" }]} />
          <div className="requirement-hero-grid"><div><h1 className="site-title">IPTU</h1><p className="site-subtitle">Perguntas frequentes sobre vencimento, pagamento, segunda via e descontos do IPTU.</p></div></div>
        </div>
      </section>
      <section className="requirement-content iptu-faq-content">
        <div className="max-w-7xl mx-auto px-4">
          <article className="iptu-faq-card" style={{ maxWidth: "1248px", margin: "0 auto", padding: "0 0 26px", background: "var(--white)", borderRadius: "16px" }}>
            <div className="iptu-faq-heading" style={{ padding: "0 0 12px" }}><h2 className="site-panel-title">Dúvidas sobre IPTU</h2><p className="site-text" style={{ margin: "6px 0 0" }}>Clique em uma pergunta para visualizar a resposta.</p></div>
            <div className="iptu-faq-list">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openQuestion === index;
                return (
                  <article className={"faq-item" + (isOpen ? " faq-item-open" : "")} key={item.question}>
                    <button type="button" className="site-text faq-question" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", padding: "16px 20px", border: 0, borderRadius: "12px", background: "var(--green-dark)", color: "var(--white)", fontFamily: "Poppins, sans-serif", fontSize: "14px", cursor: "pointer", textAlign: "left" }} aria-expanded={isOpen} onClick={() => setOpenQuestion(isOpen ? null : index)}>
                      <span>{item.question}</span><span className="iptu-faq-chevron" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && <div className="faq-answer"><p>{item.answer}</p>{item.link && <a href={item.link} target="_blank" rel="noreferrer">Acessar a 2ª via do IPTU</a>}</div>}
                  </article>
                );
              })}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
