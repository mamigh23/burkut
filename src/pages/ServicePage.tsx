import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Brand, Eyebrow } from "../components/UI";
import { MotionProvider, MotionToggle } from "../components/Motion";
import Contact, { type Draft } from "../sections/Contact";
import Yangan from "../yangan/Yangan";
import ServiceExample from "../components/ServiceExample";
import { startProject, focusProjectForm } from "../shared/startProject";
import { useInitialAnchor } from "../shared/useInitialAnchor";
import { serviceDetails, type ServiceDetail } from "../content/serviceDetails";

export default function ServicePage({ service }: { service: ServiceDetail }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  useInitialAnchor();
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        İçeriğe geç
      </a>
      <header className="service-page-header">
        <div className="container">
          <Brand href="/" />
          <nav aria-label="Hizmet sayfası">
            <a href="/#hizmetler">
              <ArrowLeft size={16} aria-hidden="true" /> Tüm hizmetler
            </a>
            <a href="#iletisim" onClick={startProject}>
              Projeni anlat <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="service-detail-hero">
          <div className="container service-hero-layout">
            <div className="service-hero-copy">
              <nav className="service-breadcrumb" aria-label="Sayfa konumu">
                <a href="/">Ana sayfa</a>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{service.label}</span>
              </nav>
              <Eyebrow light>{service.eyebrow}</Eyebrow>
              <h1>
                {service.title}
                <br />
                <span>{service.highlight}</span>
              </h1>
              <p>{service.intro}</p>
              <a
                href="#iletisim"
                className="button button-primary"
                onClick={startProject}
              >
                {service.action} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <ServiceExample area={service.area} />
          </div>
        </section>
        <section className="section-pad service-detail-content">
          <div className="container">
            <div className="service-detail-intro">
              <Eyebrow>NE ELDE EDERSİN?</Eyebrow>
              <h2>Fikrinden ilk somut adıma.</h2>
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
            <details className="service-process-disclosure">
              <summary>
                Süreç ve ilk görüşme için hazırlık{" "}
                <span aria-hidden="true">+</span>
              </summary>
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
                    Varsa bunları hazırlaman, ihtiyaçlarını daha hızlı
                    anlamamıza yardımcı olur.
                  </p>
                  <ul>
                    {service.preparation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
            <div className="service-detail-section service-faq-compact">
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
        <Contact draft={draft} initialArea={service.area} />
      </main>
      <footer className="footer">
        <div className="container footer-bottom">
          <Brand footer href="/" />
          <a href="/">Ana sayfaya dön</a>
          <nav className="service-footer-related" aria-label="Diğer hizmetler">
            {serviceDetails
              .filter((item) => item.area !== service.area)
              .map((item) => (
                <a key={item.area} href={item.path}>
                  {item.label}
                </a>
              ))}
          </nav>
          <span className="mono release-version">
            Sürüm {import.meta.env.VITE_RELEASE_ID || "geliştirme"}
          </span>
          <MotionToggle />
        </div>
      </footer>
      <Yangan
        open={chatOpen}
        setOpen={setChatOpen}
        initialArea={service.area}
        onDraft={(nextDraft) => {
          setDraft(nextDraft);
          requestAnimationFrame(() => focusProjectForm());
        }}
      />
    </MotionProvider>
  );
}
