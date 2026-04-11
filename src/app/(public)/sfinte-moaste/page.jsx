import Link from "next/link";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import Card from "@/components/ui/Card";
import { getAllMdx, sortByOrdine } from "@/lib/mdx";
import StructuredData, { buildBreadcrumbList } from "@/components/StructuredData";

export const metadata = {
  title: "Sfinte Moaște și Icoane",
  description:
    "Moaștele Sf. Efrem cel Nou, Sf. Luca al Crimeei, Sf. Nichifor cel Lepros, Sf. Mucenița Agnia și icoana Maicii Domnului Grabnic Ascultătoare — la Mănăstirea din Târgușor, Constanța.",
  keywords: [
    "moaște sfântul efrem cel nou românia",
    "sfântul efrem cel nou minuni",
    "icoana grabnic ascultătoare",
    "sfânt pentru dependențe droguri",
    "sfânt pentru examene grele",
    "sfânt pentru procese",
  ],
  alternates: { canonical: "/sfinte-moaste" },
};

export default function SfinteMoastePage() {
  const items = sortByOrdine(getAllMdx("moaste"));

  return (
    <>
      <StructuredData
        data={buildBreadcrumbList([
          { name: "Acasă", url: "/" },
          { name: "Sfinte Moaște" },
        ])}
      />
      {/* ═══ INTRO ═══ */}
      <section className="py-12 md:py-16">
        <div className="container-page max-w-[65ch]">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-3">
            Comori ale credinței
          </p>
          <h1>Sfinte Moaște și Icoane</h1>
          <p className="mt-4">
            Mănăstirea Sfinților Dionisie și Efrem adăpostește comori de mare
            preț pentru credincioși: părticele din moaștele a patru sfinți și o
            copie a icoanei făcătoare de minuni «Grabnic Ascultătoare» de la
            Sfântul Munte Athos.
          </p>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ LISTA MOAȘTE ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map(({ frontmatter, slug }) => (
              <MoasteCard key={slug} slug={slug} {...frontmatter} />
            ))}
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ INFORMAȚII VIZITARE ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page max-w-2xl">
          <div className="p-5 md:p-6 bg-secondary rounded-[4px] border border-border">
            <div className="flex gap-3 items-start">
              <Cross size={16} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-text text-[0.9375rem] font-body">
                  Moaștele și icoana sunt așezate spre închinare în paraclisul
                  mănăstirii. Închinarea este posibilă zilnic între orele{" "}
                  <strong className="font-500">08:00–13:00</strong> și{" "}
                  <strong className="font-500">16:00–19:00</strong>.
                </p>
                <p className="mt-2 text-text-muted text-[0.8125rem] max-w-none">
                  În zilele de praznic și la hramuri, paraclisul rămâne deschis
                  pe toată durata slujbelor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Card moaste ─── */

function MoasteCard({ slug, nume, praznuire, tip, descriere_scurta, ajutor_pentru }) {
  const isIcon = tip === "icoana";

  return (
    <Card as="article" className="flex flex-col">
      <div className="flex-1">
        {/* Badge tip */}
        <span className="inline-block text-[0.6875rem] font-body font-500 uppercase tracking-[0.1em] text-olive bg-primary px-2 py-0.5 rounded-[3px] border border-border mb-3">
          {isIcon ? "Icoană" : "Moaște"}
        </span>

        <h2 className="text-lg font-heading font-600 text-text mb-1">
          <Link
            href={`/sfinte-moaste/${slug}`}
            className="hover:text-grena transition-colors"
          >
            {nume}
          </Link>
        </h2>

        <p className="text-[0.8125rem] font-body text-olive mb-3">
          Prăznuire: {praznuire}
        </p>

        <p className="text-[0.9375rem] text-text-secondary mb-4 max-w-none">
          {descriere_scurta}
        </p>

        {/* Ajutor pentru — primele 3 */}
        {ajutor_pentru && ajutor_pentru.length > 0 && (
          <div className="mb-4">
            <p className="text-[0.75rem] font-body font-500 text-text-muted mb-1.5">
              {isIcon ? "Se roagă pentru:" : "Grabnic ajutător pentru:"}
            </p>
            <ul className="space-y-1">
              {ajutor_pentru.slice(0, 3).map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 items-start text-[0.8125rem] text-text-secondary"
                >
                  <Cross size={8} className="text-gold shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
              {ajutor_pentru.length > 3 && (
                <li className="text-[0.75rem] text-text-muted pl-4">
                  și altele…
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <Link
        href={`/sfinte-moaste/${slug}`}
        className="text-[0.875rem] font-body font-500 text-olive hover:text-text transition-colors"
      >
        {"Citește fișa completă \u2192"}
      </Link>
    </Card>
  );
}
