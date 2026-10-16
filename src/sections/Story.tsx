import { useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Gamepad2,
  Smartphone,
  Accessibility,
  Gauge,
  Braces,
  SlidersHorizontal,
  Plus,
  Minus,
} from "lucide-react";
import { services, steps, faqs } from "../content";
import { serviceDetails } from "../content/serviceDetails";
import { ArrowLink, Eyebrow, YanganMark } from "../components/UI";
import { Dashboard } from "../concepts/Scenes";
import Planet from "../components/Planet";
import ScrollBand from "../components/ScrollBand";
import { startProject } from "../shared/startProject";

export function Vision() {
  return (
    <section className="vision section-pad" id="vizyon">
      <div className="container">
        <div className="vision-heading">
          <Eyebrow>İYİ FİKİRLER, İYİ BİR BAŞLANGIÇ İSTER.</Eyebrow>
          <h2>
            Bir fikrin var.
            <br />
            Biz onu{" "}
            <span className="vision-highlight">
              insanların
              <br className="desktop-break" /> kullanacağı
            </span>{" "}
            bir ürüne
            <br className="desktop-break" /> dönüştürmek için buradayız.
          </h2>
          <p>
            Güzel görünmenin ötesinde; anlaşılır, işlevsel
            <br className="desktop-break" /> ve özenle geliştirilmiş dijital
            deneyimler.
          </p>
        </div>
        <Dashboard />
      </div>
    </section>
  );
}

export function Services() {
  const icons = { web: Code2, app: Smartphone, game: Gamepad2 };
  return (
    <>
      <ScrollBand />
      <section className="services section-pad" id="hizmetler">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>NELER YAPIYORUZ?</Eyebrow>
              <h2>
                Farklı fikirler.
                <br />
                <span>Ortak bir özen.</span>
              </h2>
            </div>
            <p>
              İlk taslaktan çalışan ürüne.
              <br />
              Tasarımı ve mühendisliği bir arada ele alarak fikrinize uygun
              çözümler geliştiriyoruz.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = icons[service.id];
              return (
                <article
                  key={service.id}
                  className={`service-card service-${service.id}`}
                >
                  <div className="service-card-top">
                    <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                    <span className="mono">/{service.number}</span>
                  </div>
                  <div className="service-illustration" aria-hidden="true">
                    {service.id === "web" ? (
                      <div className="mini-browser">
                        <div>
                          <i />
                          <i />
                          <i />
                        </div>
                        <b>
                          Merhaba,
                          <br />
                          yeni dünya.
                        </b>
                        <span />
                        <span />
                      </div>
                    ) : service.id === "app" ? (
                      <div className="mini-phone">
                        <span>rota.</span>
                        <div>
                          12<small>BUGÜN</small>
                        </div>
                        <i />
                        <i />
                      </div>
                    ) : (
                      <div className="mini-game">
                        <span className="orbit orbit-one" />
                        <span className="orbit orbit-two" />
                        <Gamepad2 size={72} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <h3>{service.title}</h3>
                  <b className="service-subtitle">{service.subtitle}</b>
                  <p>{service.description}</p>
                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a
                    href={
                      serviceDetails.find((item) => item.area === service.id)!
                        .path
                    }
                    className="service-link"
                  >
                    Hizmeti incele <ArrowUpRight size={18} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function Approach() {
  const [active, setActive] = useState(0);
  return (
    <section className="approach section-pad dark-section" id="yaklasim">
      <div className="container approach-layout">
        <div className="approach-copy">
          <Eyebrow light>NASIL ÇALIŞIYORUZ?</Eyebrow>
          <p>
            Teknik karmaşadan uzak,
            <br />
            fikrinize yakın bir süreç.
          </p>
          <h2>
            Birlikte düşün.
            <br />
            Özenle üret.
            <br />
            <span>İleriye taşı.</span>
          </h2>
          <ArrowLink className="button-light">Birlikte Başlayalım</ArrowLink>
        </div>
        <div className="process-panels">
          {steps.map((step, index) => (
            <div
              className={`process-card ${active === index ? "is-active" : ""}`}
              key={step.title}
            >
              <button
                className="process-button"
                aria-expanded={active === index}
                aria-controls={`process-${index}`}
                onClick={() => setActive(index)}
              >
                <span className="mono">00{index + 1}</span>
                <span>{step.title}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
                {active === index && (
                  <span className="sr-only">{step.title}</span>
                )}
              </button>
              <div className="process-content" id={`process-${index}`}>
                <span className="mobile-process-number mono">
                  00{index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="mono">{step.tags}</span>
                <div className={`process-art art-${index}`} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About({ onChat }: { onChat: () => void }) {
  return (
    <section className="about dark-section" id="burkut">
      <div className="container">
        <div className="about-statement">
          <span className="mono">BÜRKÜT / BAKIŞ AÇIMIZ</span>
          <h2>
            İyi tasarım hissedilir.
            <br />
            İyi yazılım <span>hayatı kolaylaştırır.</span>
          </h2>
          <p>
            Biz ikisinin buluştuğu yerdeyiz. Web'de, uygulamada ve oyunda; her
            fikri kendi ihtiyacına göre ele alıyoruz.
          </p>
        </div>
        <div className="about-bottom">
          <div className="about-values">
            <span>Merakla başlarız.</span>
            <span>Açık konuşuruz.</span>
            <span>Özenle geliştiririz.</span>
          </div>
          <div className="yangan-intro">
            <YanganMark />
            <div>
              <span className="mono">TANIŞTIRALIM: YANGAN</span>
              <h3>Bir fikirle başlayalım mı?</h3>
              <p>
                Bürküt'ün dijital asistanı.
                <br />
                Fikrini birlikte netleştirelim.
              </p>
              <button onClick={onChat}>
                Sorunu Yangan'a anlat <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Technology() {
  const items = [
    {
      icon: Gauge,
      title: "Performans",
      text: "Hızlı ve akıcı deneyimler için yükleme ve arayüz davranışını birlikte düşünürüz.",
    },
    {
      icon: Accessibility,
      title: "Erişilebilirlik",
      text: "Farklı ekranları, klavye kullanımını ve okunabilirliği tasarımın bir parçası sayarız.",
    },
    {
      icon: Braces,
      title: "Sürdürülebilir kod",
      text: "Anlaşılır, düzenli ve geliştirmeye açık bir yapı kurmaya odaklanırız.",
    },
    {
      icon: SlidersHorizontal,
      title: "İhtiyaca uygun araçlar",
      text: "Teknik tercihlerimizi projenin hedefi, platformu ve gereksinimleriyle belirleriz.",
    },
  ];
  return (
    <section className="technology section-pad" id="teknoloji">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>GÖRÜNENİN ARKASINDA</Eyebrow>
            <h2>
              Güçlü bir deneyim.
              <br />
              <span>Sağlam bir temel.</span>
            </h2>
          </div>
          <p>
            Görünüm kadar, nasıl çalıştığı da önemli.
            <br />
            İyi bir dijital ürünün temelinde bu ilkeler var.
          </p>
        </div>
        <div className="tech-grid">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="tech-stack">
          <span className="mono">BU SİTENİN ALTYAPISI</span>
          <div>
            <span>React</span>
            <span>TypeScript</span>
            <span>Vite</span>
            <span>Tailwind CSS</span>
          </div>
          <span className="tech-stack-note">
            Araçlar değişir. Özen değişmez.
          </span>
        </div>
      </div>
    </section>
  );
}

export function Connection() {
  return (
    <section className="connection" id="birlikte">
      <div className="container connection-copy">
        <Eyebrow>YENİ BİR BAŞLANGIÇ</Eyebrow>
        <h2>
          Bir fikir,
          <br />
          <span>pek çok ihtimal.</span>
        </h2>
        <p>
          Küçük bir başlangıç, yeni bir dijital dünyaya açılabilir.
          <br />
          Sen fikrini getir. Gerisini birlikte düşünelim.
        </p>
        <ArrowLink>Fikrini Paylaş</ArrowLink>
      </div>
      <Planet />
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq section-pad" id="sss">
      <div className="container faq-layout">
        <div>
          <Eyebrow>AKLINDAKİ SORULAR</Eyebrow>
          <h2>
            Merak
            <br /> <span>ettiklerin.</span>
          </h2>
          <p>
            Her proje bir soruyla başlar.
            <br />
            Seninkini de birlikte yanıtlayalım.
          </p>
          <a className="text-link" href="#iletisim" onClick={startProject}>
            Başka bir sorun mu var? <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div
              className={`faq-item ${open === index ? "faq-open" : ""}`}
              key={question}
            >
              <h3>
                <button
                  id={`faq-button-${index}`}
                  aria-expanded={open === index}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  {question}
                  <span>
                    {open === index ? <Minus size={17} /> : <Plus size={17} />}
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-button-${index}`}
                hidden={open !== index}
              >
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
