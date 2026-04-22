import Link from "next/link";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import Card from "@/components/ui/Card";
import StructuredData, { buildBreadcrumbList, buildEvent } from "@/components/StructuredData";

export const revalidate = 3600; // ISR: revalidare la 1 oră

export const metadata = {
  title: "Programul Sfintelor Slujbe",
  description:
    "Programul sfintelor slujbe la Mănăstirea Sf. Dionisie Exiguul și Sf. Efrem cel Nou, Târgușor, Constanța. Sfânta Liturghie duminica de la ora 9.",
  alternates: { canonical: "/program-slujbe" },
};

/* ─── Date fallback praznice (când Supabase nu e configurat) ─── */

const FALLBACK_PRAZNICE = [];

/* ─── Data fetching ─── */

async function getPraznice() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return FALLBACK_PRAZNICE;
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("praznice")
      .select("*")
      .gte("data", today)
      .order("data", { ascending: true })
      .limit(5);
    if (error) throw error;
    return data || FALLBACK_PRAZNICE;
  } catch {
    return FALLBACK_PRAZNICE;
  }
}

/* ─── Helpers ─── */

function formatOra(timeStr) {
  if (!timeStr) return "";
  return timeStr.slice(0, 5); // "09:00:00" → "09:00"
}

function formatData(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ─── Componente locale ─── */

function PraznicCard({ praznic }) {
  return (
    <Card as="article" className={praznic.este_hram ? "border-grena" : ""}>
      <span className="font-heading text-[1.0625rem] font-500 text-text-muted block mb-1">
        {formatData(praznic.data)}
      </span>
      <h3
        className={`text-lg ${praznic.este_hram ? "text-grena" : "text-text"}`}
      >
        {praznic.nume}
      </h3>
      {praznic.descriere_scurta && (
        <p className="mt-2 text-[0.9375rem] text-text-secondary max-w-none">
          {praznic.descriere_scurta}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        {praznic.priveghere && (
          <span className="inline-flex items-center gap-1 text-[0.75rem] font-body font-500 text-olive bg-primary px-2 py-0.5 rounded-[3px] border border-border">
            <Cross size={10} className="text-gold" />
            Priveghere{praznic.ora_priveghere ? ` · ${formatOra(praznic.ora_priveghere)}` : ""}
          </span>
        )}
        {praznic.dezlegare_peste && (
          <span className="inline-flex items-center gap-1 text-[0.75rem] font-body font-500 text-olive bg-primary px-2 py-0.5 rounded-[3px] border border-border">
            Dezlegare la pește
          </span>
        )}
        {praznic.este_hram && (
          <span className="inline-flex items-center gap-1 text-[0.75rem] font-body font-500 text-grena bg-primary px-2 py-0.5 rounded-[3px] border border-grena/30">
            Hram
          </span>
        )}
      </div>

      {/* Program special */}
      {praznic.program_special && (
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-[0.8125rem] font-body font-500 text-text-muted mb-1">
            Program:
          </p>
          <p className="text-[0.875rem] text-text-secondary whitespace-pre-line max-w-none">
            {praznic.program_special}
          </p>
        </div>
      )}
    </Card>
  );
}

/* ─── PAGINA ─── */

export default async function ProgramSlujbePage() {
  const praznice = await getPraznice();

  return (
    <>
      <StructuredData
        data={buildBreadcrumbList([
          { name: "Acasă", url: "/" },
          { name: "Program slujbe" },
        ])}
      />
      {/* Event JSON-LD pentru praznice */}
      {praznice.map((p) => (
        <StructuredData
          key={p.id || p.data}
          data={buildEvent({
            name: p.nume,
            date: p.data,
            description: p.descriere_scurta || p.nume,
            isHram: p.este_hram,
          })}
        />
      ))}

      {/* ═══ PROGRAMUL COMPLET AL SLUJBELOR ═══ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive text-center mb-3">
            Programul slujbelor
          </p>
          <h2 className="font-heading text-[2rem] md:text-[2.5rem] text-text text-center mb-10">
            Rânduiala Săptămânii
          </h2>

          <div className="space-y-4">

            {/* Dimineața */}
            <div className="bg-secondary border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Cross size={14} className="text-gold shrink-0" />
                <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.1em] text-olive">
                  Dimineața
                </p>
              </div>
              <p className="font-heading text-[1.375rem] text-text mb-1">
                07:00 — Utrenia, Ceasul 1
              </p>
              <p className="text-text-secondary text-[0.9375rem] max-w-none">
                Marți, Joi și Sâmbătă se adaugă Sfânta Liturghie.
              </p>
            </div>

            {/* Seara */}
            <div className="bg-secondary border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Cross size={14} className="text-gold shrink-0" />
                <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.1em] text-olive">
                  Seara
                </p>
              </div>
              <p className="font-heading text-[1.375rem] text-text">
                17:00 — Vecernia și Pavecernița Mică
              </p>
            </div>

            {/* Sâmbăta seara și ajunuri */}
            <div className="bg-secondary border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Cross size={14} className="text-grena shrink-0" />
                <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.1em] text-olive">
                  Sâmbăta seara și în ajunul sărbătorilor mari
                </p>
              </div>
              <p className="font-heading text-[1.375rem] text-text">
                17:00 — Vecernia Mare, Litia, Utrenia
              </p>
            </div>

            {/* Duminica și Sărbători */}
            <div className="bg-secondary border border-grena/40 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Cross size={14} className="text-grena shrink-0" />
                <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.1em] text-grena">
                  Duminica și de Sărbători
                </p>
              </div>
              <p className="font-heading text-[1.375rem] text-text mb-1">
                09:00 — Ceasurile 3, 6, Dumnezeiasca Liturghie
              </p>
              <p className="font-heading text-[1.375rem] text-text">
                17:00 — Paraclisul Maicii Domnului{" "}
                <span className="font-heading italic text-[1.125rem] text-text-secondary">
                  «Grabnic Ascultătoare»
                </span>
              </p>
            </div>

            {/* Prima Vineri din Lună */}
            <div className="bg-secondary border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Cross size={14} className="text-gold shrink-0" />
                <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.1em] text-olive">
                  Prima Vineri din Lună
                </p>
              </div>
              <p className="font-heading text-[1.375rem] text-text">
                18:00 — Taina Sfântului Maslu
              </p>
            </div>

          </div>

          {/* Nota de contact */}
          <div className="mt-6 p-5 border-l-4 border-olive bg-secondary">
            <p className="text-text-secondary text-[0.9375rem] max-w-none">
              <strong className="text-text font-500">Pentru certitudine</strong>{" "}
              privind programul slujbelor, vă rugăm să sunați la mănăstire:
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-text-secondary text-[0.9375rem]">
                Părintele Ghenadie Mogoi:{" "}
                <a href="tel:+40763785574" className="text-grena font-body font-500 hover:underline">
                  0763 785 574
                </a>
              </p>
              <p className="text-text-secondary text-[0.9375rem]">
                Maica Stareță Evghenia Arău:{" "}
                <a href="tel:+40756361230" className="text-grena font-body font-500 hover:underline">
                  +40 756 361 230
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ BANNER HRAM 9 MAI 2026 ═══ */}
      <section id="hram-efrem" className="py-8 md:py-10">
        <div className="container-page max-w-2xl">
          <div className="relative overflow-hidden p-6 md:p-8 bg-grena/10 border border-grena/40 rounded-[4px]">
            {/* Accent linie stânga */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-grena" aria-hidden="true" />

            <div className="pl-4">
              <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.14em] text-grena mb-2">
                Praznic Apropiat
              </p>
              <h2 className="font-heading text-[1.5rem] md:text-[1.875rem] text-text mb-3 leading-snug">
                🕊 Hramul Sfântului Efrem cel Nou
              </h2>
              <div className="mb-4 space-y-1">
                <p className="font-heading text-[1.125rem] text-text-secondary font-500">
                  🕊 Pomenirea Sf. Efrem cel Nou: <span className="text-grena">5 Mai 2026</span>
                </p>
                <p className="font-heading text-[1.125rem] text-text-secondary font-500">
                  ⛪ Sărbătoarea Hramului (cu IPS): <span className="text-grena">9 Mai 2026</span>
                </p>
              </div>
              <p className="text-text-secondary text-[0.9375rem] leading-relaxed max-w-none">
                Toți credincioșii prezenți vor primi{" "}
                <strong className="text-text font-500">iconițe și vată cu mir</strong>{" "}
                de la Icoana Sfântului Efrem cel Nou din Kalimnos, Grecia.
                <span className="block mt-2 font-500 text-text">
                  Hramul va fi oficiat în prezența Înaltpreasfințitului, pe 9 Mai 2026.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ PRAZNICE APROPIATE ═══ */}
      <section id="praznice" className="py-8 md:py-12">
        <div className="container-page max-w-2xl">
          <h2 className="mb-8">Praznice apropiate</h2>

          {praznice.length === 0 ? (
            <p className="text-text-muted text-[0.9375rem]">
              Momentan nu sunt praznice programate. Urmăriți pagina noastră de
              Facebook pentru anunțuri.
            </p>
          ) : (
            <div className="space-y-5">
              {praznice.map((p) => (
                <PraznicCard key={p.id || p.data} praznic={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ NOTĂ VIZITARE ═══ */}
      <section id="nota-vizitare" className="py-8 md:py-12">
        <div className="container-page max-w-2xl">
          <div className="p-5 md:p-6 bg-secondary rounded-[4px] border border-border">
            <div className="flex gap-3 items-start">
              <Cross size={16} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-text text-[0.9375rem] font-body">
                  Mănăstirea este deschisă pentru închinare zilnic între orele{" "}
                  <strong className="font-500">08:00–13:00</strong> și{" "}
                  <strong className="font-500">16:00–20:00</strong>.
                </p>
                <p className="mt-2 text-text-muted text-[0.8125rem] max-w-none">
                  Între orele 13:00 și 16:00 este timpul de liniște și rugăciune
                  al obștii. Vă rugăm să respectați programul de odihnă.
                </p>
                <p className="mt-2 text-text-muted text-[0.8125rem] max-w-none">
                  De hram și de unele sărbători, mănăstirea este deschisă{" "}
                  <strong className="font-500 text-text">08:00–20:00</strong>.
                  Se va anunța din timp când este deschisă poarta toată ziua.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <Link
                href="/viziteaza"
                className="text-[0.875rem] font-body font-500 text-olive hover:text-text transition-colors duration-200"
              >
                {"Hartă și indicații de drum \u2192"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
