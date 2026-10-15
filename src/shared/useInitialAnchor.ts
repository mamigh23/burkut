import { useEffect } from "react";

export function useInitialAnchor() {
  useEffect(() => {
    let anchor: string;
    try {
      anchor = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    if (!anchor) return;
    const frame = requestAnimationFrame(() => {
      const target =
        anchor === "iletisim"
          ? document.querySelector<HTMLElement>("#iletisim .contact-form")
          : document.getElementById(anchor);
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}
