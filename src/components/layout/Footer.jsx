import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";

const NAV_LINKS = [
  { label: "Acasă", href: "/" },
  { label: "Despre", href: "/despre" },
  { label: "Program slujbe", href: "/program-slujbe" },
  { label: "Sfinte Moaște", href: "/sfinte-moaste" },
  { label: "Cuvinte", href: "/noutati" },
  { label: "Vizitează", href: "/viziteaza" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-stone-warm pt-12 pb-6">

      {/* Separator decorativ */}
      <div className="container-page">
        <CrossSeparator className="mt-0 mb-10" />
      </div>

      {/* Coloane principale */}
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Coloana 1 — Contact */}
          <div>
            <h3 className="font-heading text-[0.875rem] font-600 uppercase tracking-[0.1em] text-text mb-4">
              Contact
            </h3>
            <address className="not-italic space-y-2.5 text-[0.875rem] text-text-secondary leading-relaxed">
              <p className="max-w-none">
                Mănăstirea Sf. Dionisie Exiguul<br />
                & Sf. Efrem cel Nou
              </p>
              <p className="max-w-none">
                Comuna Târgușor, jud. Constanța<br />
                Cod 907275, România
              </p>
              <p className="max-w-none">
                <a
                  href="tel:+40763785574"
                  className="hover:text-olive transition-colors duration-200"
                >
                  +40 763 785 574
                </a>
              </p>
            </address>
          </div>

          {/* Coloana 2 — Navigație */}
          <div>
            <h3 className="font-heading text-[0.875rem] font-600 uppercase tracking-[0.1em] text-text mb-4">
              Navigație
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.875rem] text-text-secondary hover:text-olive transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coloana 3 — Facebook + Hramuri */}
          <div>
            <h3 className="font-heading text-[0.875rem] font-600 uppercase tracking-[0.1em] text-text mb-4">
              Comunitate
            </h3>
            <div className="space-y-4 text-[0.875rem] text-text-secondary">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-olive transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Pagina noastră de Facebook
              </a>

              <div className="pt-2 border-t border-[#BDB294]">
                <p className="font-heading text-[0.8125rem] text-text-muted mb-1.5">
                  Hramuri:
                </p>
                <p className="text-grena font-500 leading-snug">
                  1 Septembrie &mdash; Sf. Dionisie Exiguul<br />
                  5 Mai &mdash; Sf. Efrem cel Nou
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verset */}
        <div className="mt-10 pt-6 border-t border-[#BDB294] text-center">
          <p className="text-scripture text-[0.9375rem] text-text-muted max-w-none">
            {"\u201EPace celor ce vin, bucurie celor ce rămân, binecuvântare celor ce pleacă.\u201D"}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.75rem] text-text-muted">
          <span>
            &copy; {year} Mănăstirea Sf. Dionisie & Sf. Efrem cel Nou
          </span>
          <span className="flex items-center gap-1">
            {"Realizat cu"} <Cross size={10} className="text-grena" /> {"de "}
            <a
              href="https://clickstanga.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-olive"
            >
              ClickStânga
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
