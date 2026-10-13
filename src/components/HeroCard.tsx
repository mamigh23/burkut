import { useState, type ReactNode, type CSSProperties } from "react";
import type { HeroCardConfig } from "../content/heroCards";

export default function HeroCard({
  card,
  selected,
  onSelect,
  children,
}: {
  card: HeroCardConfig;
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const custom = card.image && !failed;
  return (
    <div
      className={`hero-card hero-${card.id} ${custom ? "hero-card-custom" : ""}`}
      data-selected={selected}
    >
      <div className="hero-card-visual" aria-hidden="true">
        {custom ? (
          <img
            className="hero-card-image"
            src={card.image!.src}
            alt=""
            decoding="async"
            style={
              {
                objectFit: card.image!.fit,
                objectPosition: card.image!.position ?? "center",
              } as CSSProperties
            }
            onError={() => setFailed(true)}
          />
        ) : (
          children
        )}
      </div>
      <button
        className="hero-card-control"
        type="button"
        aria-pressed={selected}
        aria-label={`${card.label} kartını seç`}
        onClick={onSelect}
      />
    </div>
  );
}
