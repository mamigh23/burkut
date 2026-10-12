import { ArrowUpRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#top"
      aria-label="Bürküt ana sayfa"
    >
      bürküt<span className="brand-dot">.</span>
    </a>
  );
}
export function ArrowLink({
  children,
  href = "#iletisim",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a className={`button ${className}`} href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </div>
  );
}
export function YanganMark({ size = 22 }: { size?: number }) {
  return (
    <span className="yangan-mark">
      <Sparkles size={size} aria-hidden="true" />
    </span>
  );
}
