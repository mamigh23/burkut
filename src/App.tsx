import { useState } from "react";
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

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  return (
    <>
      <a className="skip-link" href="#main">
        İçeriğe geç
      </a>
      <Header />
      <main id="main">
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
            </div>
            <a className="footer-back" href="#top">
              Yukarı dön <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Bürküt Teknoloji.</span>
            <span>İlk adım. Yeni ihtimaller.</span>
            <span className="mono">DEMO / 0.1</span>
          </div>
        </div>
      </footer>
      <Yangan open={chatOpen} setOpen={setChatOpen} onDraft={setDraft} />
    </>
  );
}
