import { ArrowDown, Code2, Layers3, Gamepad2 } from "lucide-react";
import { ArrowLink } from "../components/UI";
import { GameScene, PhoneScene, WebScene } from "../concepts/Scenes";
import { useState } from "react";
import HeroCard from "../components/HeroCard";
import { heroCards, type HeroCardId } from "../content/heroCards";

export default function Hero() {
  const [selected, setSelected] = useState<HeroCardId | null>(null);
  const scenes = {
    code: (
      <>
        <div className="code-bar">
          <span />
          <span />
          <span />
          <b>bir-fikir.tsx</b>
        </div>
        <div className="code-lines">
          <span>
            01 <i>const</i> burkut = {"{"}
          </span>
          <span>
            02 fikir: <em>'Seninle başlar'</em>,
          </span>
          <span>
            03 yaklaşım: <em>'Birlikte üret'</em>,
          </span>
          <span>
            04 deneyim: <em>'Özenle geliştir'</em>
          </span>
          <span>05 {"}"}</span>
          <span>06</span>
          <span>
            07 <i>await</i> burkut.<b>hayataGeçir</b>()
          </span>
        </div>
        <div className="code-bottom">
          <i /> YENİ BİR BAŞLANGIÇ
        </div>
      </>
    ),
    web: <WebScene compact />,
    phone: <PhoneScene />,
    game: <GameScene compact />,
    wire: (
      <>
        <div className="wire-grid" />
        <span>
          tasarım
          <br />
          <b>+ kod.</b>
        </span>
        <div className="wire-bottom">
          <Layers3 size={20} /> AYNI DİL. AYNI HEDEF.
        </div>
      </>
    ),
  };
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <span className="hero-kicker">
          <i /> FİKİRDEN ÇALIŞAN ÜRÜNE
        </span>
        <h1>
          Fikirlerinize güç veren
          <br /> <span>dijital ürünler.</span>
        </h1>
        <p>
          Web siteleri, uygulamalar ve oyunlar.
          <br className="mobile-break" /> Tasarım ve yazılımı birlikte düşünür,
          <br className="desktop-break" /> fikrinizi özenli bir deneyime
          dönüştürürüz.
        </p>
        <div className="hero-actions">
          <ArrowLink>Projeni Anlat</ArrowLink>
          <a className="text-link" href="#hizmetler">
            Neler Yapıyoruz? <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div
        className="hero-showcase"
        role="group"
        aria-label="Hero konsept kartları"
      >
        {heroCards.map((card) => (
          <HeroCard
            key={`${card.id}:${card.image?.src ?? "default"}`}
            card={card}
            selected={selected === card.id}
            onSelect={() => setSelected(selected === card.id ? null : card.id)}
          >
            {scenes[card.id]}
          </HeroCard>
        ))}
      </div>
      <div className="hero-bottom">
        <div>
          <span>
            <Code2 size={16} /> Web
          </span>
          <i />
          <span>
            <Layers3 size={16} /> Uygulama
          </span>
          <i />
          <span>
            <Gamepad2 size={16} /> Oyun
          </span>
        </div>
        <span className="hero-concept-label">KONSEPT ARAYÜZLER</span>
      </div>
    </section>
  );
}
