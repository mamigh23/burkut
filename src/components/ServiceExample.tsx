import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { Area } from "../content";

import { serviceExamples } from "../content/serviceExamples";

export default function ServiceExample({ area }: { area: Area }) {
  const kind = area === "other" ? "web" : area;
  const example = serviceExamples[kind];
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current!;
    modal.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  const source = (index: number) => example.images[index].src;
  return (
    <>
      <figure className="service-example">
        <button
          ref={trigger}
          type="button"
          className="service-example-open"
          onClick={() => setActive(0)}
          aria-label={`${example.title} görsellerini büyüt`}
        >
          <img
            src={source(0)}
            alt={example.images[0].alt}
            width={960}
            height={720}
            fetchPriority="high"
          />
          <span className="service-example-expand">
            <Expand size={16} aria-hidden="true" /> Yakından bak
          </span>
        </button>
        <figcaption>
          <span>{example.title}</span>
          <span>Tasarım konsepti</span>
        </figcaption>
      </figure>
      <dialog
        ref={dialog}
        className="service-gallery"
        aria-label={example.title}
        onCancel={(event) => {
          event.preventDefault();
          setActive(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            setActive((current) => (current === 0 ? 1 : 0));
          }
        }}
      >
        <div className="service-gallery-panel">
          <div className="service-gallery-top">
            <span>{example.title} · Tasarım konsepti</span>
            <button
              type="button"
              autoFocus
              onClick={() => setActive(null)}
              aria-label="Görseli kapat"
            >
              <X size={22} />
            </button>
          </div>
          {active !== null && (
            <img
              src={source(active)}
              alt={example.images[active].alt}
              width={960}
              height={720}
            />
          )}
          <div className="service-gallery-controls">
            <button
              type="button"
              onClick={() => setActive((current) => (current === 0 ? 1 : 0))}
              aria-label="Önceki görsel"
            >
              <ArrowLeft size={20} />
            </button>
            <span aria-live="polite">{(active ?? 0) + 1} / 2</span>
            <button
              type="button"
              onClick={() => setActive((current) => (current === 0 ? 1 : 0))}
              aria-label="Sonraki görsel"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
