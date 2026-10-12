import { useEffect, useRef } from "react";
import { useMotion } from "./Motion";

const words = ["FİKİR", "TASARIM", "GELİŞTİRME", "DENEYİM"];

export default function ScrollBand() {
  const band = useRef<HTMLDivElement>(null);
  const { enabled } = useMotion();

  useEffect(() => {
    const element = band.current;
    if (!element) return;
    if (!enabled) {
      element.style.setProperty("--band-offset", "-80px");
      return;
    }

    let visible = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
        ),
      );
      const travel = Math.min(420, window.innerWidth * 0.4);
      element.style.setProperty(
        "--band-offset",
        `${-80 - progress * travel}px`,
      );
    };
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        schedule();
      },
      { rootMargin: "100px" },
    );
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  return (
    <div className="service-band" ref={band} aria-hidden="true">
      <div className="service-band-track">
        {Array.from({ length: 4 }, (_, repeat) => (
          <div className="service-band-group" key={repeat}>
            {words.map((word, index) => (
              <span className="service-band-item" key={word}>
                <b className={index % 2 ? "band-outline" : ""}>{word}</b>
                <i>✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
