import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({
  enabled: false,
  systemReduced: false,
  toggle: () => {},
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  const enabled = !systemReduced && !paused;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "enabled" : "paused";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [enabled]);

  return (
    <MotionContext.Provider
      value={{
        enabled,
        systemReduced,
        toggle: () => setPaused((value) => !value),
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}

export function MotionToggle({ planet = false }: { planet?: boolean }) {
  const { enabled, systemReduced, toggle } = useMotion();
  if (systemReduced)
    return <span className="motion-system-label">Hareket azaltıldı</span>;
  return (
    <button
      className={`motion-toggle ${planet ? "planet-motion" : ""}`}
      type="button"
      aria-pressed={!enabled}
      onClick={toggle}
      aria-label={
        enabled
          ? "Hareketi durdur: dekoratif animasyonlar"
          : "Hareketi başlat: dekoratif animasyonlar"
      }
    >
      {enabled ? (
        <Pause size={13} aria-hidden="true" />
      ) : (
        <Play size={13} aria-hidden="true" />
      )}
      {enabled ? "Hareketi durdur" : "Hareketi başlat"}
    </button>
  );
}
