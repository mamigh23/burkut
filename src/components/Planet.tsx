import { useEffect, useRef, useState } from "react";
import { MotionToggle, useMotion } from "./Motion";

export default function Planet() {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const figure = useRef<HTMLElement>(null);
  const { enabled } = useMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    if (figure.current) observer.observe(figure.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="planet-figure" ref={figure}>
      <figcaption className="planet-caption">
        <span>
          <i /> BÜRKÜT GEZEGENİ
        </span>
        <span>Hayalî bir dünya. Gerçek fikirler.</span>
      </figcaption>
      <div
        className={`planet-frame ${loaded ? "planet-loaded" : ""} ${enabled && visible ? "planet-moving" : ""}`}
      >
        {failed ? (
          <div className="planet-fallback" aria-hidden="true" />
        ) : (
          <img
            className="planet-image"
            src="/images/burkut-planet.webp"
            srcSet="/images/burkut-planet-640.webp 640w, /images/burkut-planet.webp 1254w"
            sizes="(max-width: 767px) 94vw, 850px"
            width={1254}
            height={1254}
            loading="lazy"
            decoding="async"
            alt="Bürküt için tasarlanan hayalî gezegen: orman yeşili kıtalar, mavi okyanuslar ve ince beyaz bulutlar."
            onLoad={() => setLoaded(true)}
            onError={() => {
              setFailed(true);
              setLoaded(true);
            }}
          />
        )}
        <div className="planet-atmosphere" aria-hidden="true" />
        <div className="planet-orbit" aria-hidden="true">
          <div className="planet-orbit-track" />
        </div>
        <div className="planet-service planet-service-web" aria-hidden="true">
          <i />
          <span>Web</span>
        </div>
        <div className="planet-service planet-service-app" aria-hidden="true">
          <i />
          <span>Uygulama</span>
        </div>
        <div className="planet-service planet-service-game" aria-hidden="true">
          <i />
          <span>Oyun</span>
        </div>
      </div>
      <MotionToggle planet />
    </figure>
  );
}
