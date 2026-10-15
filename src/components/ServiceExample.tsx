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
  const count = example.images.length;
  const index = active === null || count === 0 ? 0 : active % count;
  const isOpen = active !== null && count > 0;
  const selected = example.images[index];
  const move = (direction: number) =>
    setActive((current) =>
      current === null || count === 0
        ? current
        : ((current % count) + direction + count) % count,
    );
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
  if (count === 0) return null;
  return (
    <>
      <figure className="service-example">
        <button
          ref={trigger}
          type="button"
          className="service-example-open"
          onClick={() => setActive(0)}
          aria-label={`Yakından bak: ${example.title} görsellerini büyüt`}
        >
          <img
            src={example.images[0].src}
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
          if (event.key === "Tab") {
            const buttons = Array.from(
              dialog.current?.querySelectorAll<HTMLButtonElement>(
                "button:not(:disabled)",
              ) ?? [],
            );
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
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
          {isOpen && selected && (
            <img
              src={selected.src}
              alt={selected.alt}
              width={960}
              height={720}
            />
          )}
          <div className="service-gallery-controls">
            {count > 1 && (
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Önceki görsel"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <span aria-live="polite">
              {index + 1} / {count}
            </span>
            {count > 1 && (
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Sonraki görsel"
              >
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
