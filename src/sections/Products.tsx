import { useRef, useState } from "react";
import { ArrowUpRight, Check, Code2, Gamepad2, Smartphone } from "lucide-react";
import { concepts } from "../content";
import { Eyebrow } from "../components/UI";
import { WebScene, PhoneScene, GameScene } from "../concepts/Scenes";

const tabs = [
  { id: "web", label: "Web", icon: Code2 },
  { id: "app", label: "Uygulama", icon: Smartphone },
  { id: "game", label: "Oyun", icon: Gamepad2 },
] as const;
export default function Products() {
  const [active, setActive] = useState<"web" | "app" | "game">("web");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const concept = concepts[active];
  return (
    <section className="products section-pad" id="urunler">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>FİKRİN GÖRÜNÜR HALİ</Eyebrow>
            <h2>
              Tek bir yaklaşım.
              <br />
              <span>Farklı dünyalar.</span>
            </h2>
          </div>
          <div className="products-heading-right">
            <p>
              Bir web sayfası, cebinizdeki bir uygulama veya keşfedilecek bir
              oyun. Her deneyime aynı özen.
            </p>
            <div
              className="product-tabs"
              role="tablist"
              aria-label="Konsept ürün türü"
            >
              {tabs.map(({ id, label, icon: Icon }, index) => (
                <button
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                  key={id}
                  id={`tab-${id}`}
                  role="tab"
                  aria-selected={active === id}
                  aria-controls={`panel-${id}`}
                  tabIndex={active === id ? 0 : -1}
                  onClick={() => setActive(id)}
                  onKeyDown={(event) => {
                    let next: number;
                    if (event.key === "ArrowRight") next = (index + 1) % 3;
                    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = 2;
                    else return;
                    event.preventDefault();
                    setActive(tabs[next].id);
                    refs.current[next]?.focus();
                  }}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`product-panel product-panel-${active}`}
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
        >
          <div className="concept-meta">
            <span>
              <i /> {concept.name}
            </span>
            <span>
              Konsept arayüz <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
          <div className="concept-stage" key={active} aria-hidden="true">
            {active === "web" ? (
              <>
                <WebScene />
                <div className="web-side-label">
                  FORM.
                  <br />
                  FONKSİYON.
                  <br />
                  <b>DENGE.</b>
                </div>
              </>
            ) : active === "app" ? (
              <>
                <div className="app-scene-message">
                  <span className="mono">BİR GÜN. BİR ADIM.</span>
                  <span>
                    Kendi
                    <br />
                    <b>ritminde.</b>
                  </span>
                  <div className="app-circle" />
                </div>
                <PhoneScene />
                <PhoneScene alternate />
              </>
            ) : (
              <GameScene />
            )}
          </div>
          <div className="concept-caption">
            <div>
              <span className="mono">{concept.label}</span>
              <h3>{concept.title}</h3>
            </div>
            <p>{concept.description}</p>
          </div>
        </div>
        <div className="benefits">
          {concept.benefits.map((benefit, i) => (
            <div key={benefit}>
              <span>0{i + 1}</span>
              <Check size={16} aria-hidden="true" />
              <p>{benefit}</p>
            </div>
          ))}
        </div>
        <p className="concept-disclaimer">
          Bu sahneler Bürküt için hazırlanmış tasarım konseptleridir; teslim
          edilmiş müşteri projeleri değildir.
        </p>
      </div>
    </section>
  );
}
