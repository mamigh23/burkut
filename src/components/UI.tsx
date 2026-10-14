import { ArrowUpRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#top"
      aria-label="Bürküt ana sayfa"
    >
      <img
        className="brand-mark"
        src="/images/brand/logo-mark.webp"
        width={192}
        height={122}
        alt=""
      />
      <img
        className="brand-wordmark"
        src="/images/brand/logo-wordmark.webp"
        width={512}
        height={67}
        alt=""
      />
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
