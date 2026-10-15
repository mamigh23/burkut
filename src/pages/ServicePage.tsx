import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Brand, Eyebrow } from "../components/UI";
import { MotionProvider, MotionToggle } from "../components/Motion";
import Contact from "../sections/Contact";
import type { ServiceDetail } from "../content/serviceDetails";

export default function ServicePage({ service }: { service: ServiceDetail }) {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        İçeriğe geç
      </a>
      <div className="service-page-header">
        <div className="container">
          <Brand href="/" />
          <nav aria-label="Hizmet sayfası">
            <a href="/#hizmetler">
              <ArrowLeft size={16} aria-hidden="true" /> Tüm hizmetler
            </a>
            <a href="#iletisim">
              Projeni anlat <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
      <main id="main" tabIndex={-1}>
        <section className="service-detail-hero">
          <div className="container">
            <Eyebrow light>WEB TASARIM VE GELİŞTİRME</Eyebrow>
            <h1>
              {service.title}
              <br />
              <span>{service.highlight}</span>
            </h1>
            <p>{service.intro}</p>
            <a href="#iletisim" className="button button-primary">
              Web projemi konuşalım{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section className="section-pad service-detail-content">
          <div className="container">
            <div className="service-detail-intro">
              <Eyebrow>KİMLER İÇİN?</Eyebrow>
              <h2>
                İhtiyacına göre
                <br />
                bir başlangıç.
              </h2>
              <p>{service.audience}</p>
            </div>
            <div className="service-detail-grid">
              {service.outputs.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="service-detail-section">
              <Eyebrow>NASIL İLERLERİZ?</Eyebrow>
              <h2>
                Adım adım,
                <br />
                birlikte şekillenir.
              </h2>
              <ol className="service-detail-steps">
                {service.steps.map((step, i) => (
                  <li key={step.title}>
                    <span className="mono">0{i + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="service-detail-section service-preparation">
              <div>
                <Eyebrow>İLK GÖRÜŞME İÇİN</Eyebrow>
                <h2>
                  Fikrin yeter.
                  <br />
                  Detayları konuşuruz.
                </h2>
              </div>
              <div>
                <p>
                  Varsa bunları hazırlaman, ihtiyaçlarını daha hızlı anlamamıza
                  yardımcı olur.
                </p>
                <ul>
                  {service.preparation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="service-detail-section">
              <Eyebrow>MERAK ETTİKLERİN</Eyebrow>
              <h2>Başlamadan önce.</h2>
              <div className="service-detail-faq">
                {service.faqs.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Contact draft={null} initialArea={service.area} />
      </main>
      <footer className="footer">
        <div className="container footer-bottom">
          <Brand footer href="/" />
          <a href="/">Ana sayfaya dön</a>
          <span className="mono release-version">
            Sürüm {import.meta.env.VITE_RELEASE_ID || "geliştirme"}
          </span>
          <MotionToggle />
        </div>
      </footer>
    </MotionProvider>
  );
}
