import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "./components/Header";
import { Brand } from "./components/UI";
import Hero from "./sections/Hero";
import Products from "./sections/Products";
import {
  Vision,
  Services,
  Approach,
  About,
  Technology,
  Connection,
  FAQ,
} from "./sections/Story";
import Contact, { type Draft } from "./sections/Contact";
import Yangan from "./yangan/Yangan";
import { MotionProvider, MotionToggle } from "./components/Motion";
import { companyContact } from "./contact";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (!anchor) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        İçeriğe geç
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Vision />
        <Services />
        <Products />
        <Approach />
        <About onChat={() => setChatOpen(true)} />
        <Technology />
        <Connection />
        <FAQ />
        <Contact draft={draft} />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand footer />
              <p>
                Fikirden çalışan ürüne.
                <br />
                Web, uygulama ve oyun geliştirme.
              </p>
            </div>
            <div className="footer-links">
              <a href="#hizmetler">Hizmetler</a>
              <a href="#urunler">Ürün konseptleri</a>
              <a href="#yaklasim">Yaklaşım</a>
              <a href="#sss">SSS</a>
              <a href={`mailto:${companyContact.email}`}>E-posta</a>
              <a href={companyContact.phoneHref}>{companyContact.phone}</a>
              <a
                href={companyContact.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram<span className="sr-only"> (yeni sekmede açılır)</span>
              </a>
            </div>
            <a className="footer-back" href="#top">
              Yukarı dön <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Bürküt Teknoloji.</span>
            <span>İlk adım. Yeni ihtimaller.</span>
            <MotionToggle />
          </div>
        </div>
      </footer>
      <Yangan
        open={chatOpen}
        setOpen={setChatOpen}
        onDraft={(nextDraft) => {
          setDraft(nextDraft);
          requestAnimationFrame(() => {
            document
              .getElementById("contact-name")
              ?.focus({ preventScroll: true });
          });
        }}
      />
    </MotionProvider>
  );
}
