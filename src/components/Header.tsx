import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "../content";
import { Brand } from "./UI";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const update = (event: MediaQueryListEvent) => {
      if (event.matches) {
        const focused = document.activeElement;
        if (
          focused instanceof HTMLAnchorElement &&
          focused.closest("#mobile-menu")
        ) {
          const href = focused.getAttribute("href");
          const destination = Array.from(
            header.current?.querySelectorAll<HTMLAnchorElement>(
              ".nav-capsule a",
            ) ?? [],
          ).find((link) => link.getAttribute("href") === href);
          destination?.focus();
        } else if (focused === menuButton.current) {
          header.current?.querySelector<HTMLAnchorElement>(".brand")?.focus();
        }
        setOpen(false);
      }
    };
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: Event) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("focusin", dismissOutside);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className={`site-header ${scrolled ? "scrolled" : ""}`}
    >
      <nav className="nav-capsule" aria-label="Ana navigasyon">
        <Brand />
        <div className="desktop-links">
          {navigation.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#iletisim">
          Projeni Anlat <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <nav
          className="mobile-menu"
          id="mobile-menu"
          aria-label="Mobil navigasyon"
        >
          {[...navigation, ["İletişim", "iletisim"]].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => {
                setOpen(false);
                requestAnimationFrame(() => {
                  const section = document.getElementById(id);
                  if (section) {
                    section.tabIndex = -1;
                    section.focus({ preventScroll: true });
                  }
                });
              }}
            >
              {label}
              <ArrowUpRight size={20} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
