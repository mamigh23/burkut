import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { startProject } from "../shared/startProject";

export function Brand({
  footer = false,
  href = "#top",
}: {
  footer?: boolean;
  href?: string;
}) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href={href}
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
    <a
      className={`button ${className}`}
      href={href}
      onClick={href === "#iletisim" ? startProject : undefined}
    >
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
export function YanganMark({ thinking = false }: { thinking?: boolean }) {
  return (
    <span
      className={`yangan-mark${thinking ? " yangan-thinking" : ""}`}
      aria-hidden="true"
    >
      <img
        src="/images/brand/yangan-avatar.png"
        width={256}
        height={256}
        alt=""
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
