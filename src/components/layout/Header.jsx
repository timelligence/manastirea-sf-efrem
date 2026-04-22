"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cross from "@/components/ui/Cross";

const NAV_ITEMS = [
  { label: "Acasă", href: "/" },
  { label: "Despre", href: "/despre" },
  { label: "Program", href: "/program-slujbe" },
  { label: "Sfinte Moaște", href: "/sfinte-moaste" },
  { label: "Cuvinte", href: "/noutati" },
  { label: "Vizitează", href: "/viziteaza" },
];

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <header
        id="site-header"
        className={`
          fixed top-0 left-0 right-0 z-50
          h-[var(--header-height)]
          bg-primary
          transition-shadow duration-200 ease-out
          ${scrolled ? "border-b border-border shadow-[0_1px_3px_rgba(43,31,20,0.08)]" : ""}
        `}
      >
        <div className="container-page h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <Cross
                size={22}
                className="text-grena"
              />
              <span className="font-heading text-[0.95rem] font-500 leading-tight tracking-wide text-text">
                {"Mănăstirea"}
                <br />
                <span className="text-[0.7rem] font-400 tracking-[0.08em] uppercase text-text-muted">
                  {"Sf. Dionisie & Sf. Efrem"}
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              id="desktop-nav"
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Navigație principală"
            >
              {NAV_ITEMS.map(({ label, href }) => {
                const active = href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      px-3 py-1.5 text-[0.875rem] font-body font-500 rounded
                      transition-colors duration-200
                      ${active
                        ? "text-olive"
                        : "text-text-secondary hover:text-olive"
                      }
                    `}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(v => !v)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded text-text-secondary hover:text-text transition-colors duration-200"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              aria-label={drawerOpen ? "Închide meniul" : "Deschide meniul"}
            >
              <span className={`block h-px w-5 bg-current transition-transform duration-200 ${drawerOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-current transition-opacity duration-200 ${drawerOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-current transition-transform duration-200 ${drawerOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — lateral din dreapta */}
      <div
        id="mobile-drawer"
        className={`
          fixed inset-0 z-40 lg:hidden
          transition-[visibility] duration-200
          ${drawerOpen ? "visible" : "invisible"}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Meniu navigație"
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-[#2B1F14]/30
            transition-opacity duration-200
            ${drawerOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={closeDrawer}
          aria-hidden="true"
        />

        {/* Panel */}
        <nav
          className={`
            absolute right-0 top-0 bottom-0
            w-72 max-w-[80vw] bg-primary
            border-l border-border
            flex flex-col
            transition-transform duration-200 ease-out
            ${drawerOpen ? "translate-x-0" : "translate-x-full"}
          `}
          aria-label="Navigație mobilă"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 h-[var(--header-height)] border-b border-border">
            <span className="font-heading text-sm font-500 text-text">
              Navigare
            </span>
            <button
              type="button"
              onClick={closeDrawer}
              className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text rounded transition-colors duration-200"
              aria-label="Închide meniul"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <ul className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(({ label, href }) => {
              const active = href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      block px-4 py-3 rounded text-[0.9375rem] font-body
                      transition-colors duration-200
                      ${active
                        ? "text-olive font-500 bg-secondary"
                        : "text-text-secondary hover:text-text hover:bg-secondary"
                      }
                    `}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Contact quick */}
          <div className="px-5 py-5 border-t border-border">
            <a
              href="tel:+40763785574"
              className="
                flex items-center justify-center gap-2
                py-2.5 px-4 rounded
                border border-text text-text text-sm font-body font-500
                hover:bg-text hover:text-primary
                transition-colors duration-200
              "
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +40 763 785 574
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
