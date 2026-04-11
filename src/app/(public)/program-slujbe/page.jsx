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

      {/* ═══ SFÂNTA LITURGHIE — DOAR DUMINICA CONFIRMATĂ ═══ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#4A5D3A] mb-3">
            Programul slujbelor
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2B1F14] mb-8">
            Sfânta Liturghie
          </h2>

          <div className="bg-[#EFE8D8] border border-[#C9BFA8] p-10 mb-10">
            <p className="font-serif text-2xl text-[#2B1F14] mb-2">Duminica</p>
            <p className="text-xl text-[#6B1D2A] mb-6">ora 09:00</p>
            <p className="text-[#5C4A35] leading-relaxed">
              Programul detaliat al celorlalte zile, precum și al privegherilor
              de praznice, va fi actualizat în curând cu binecuvântarea obștii.
            </p>
          </div>

          <div className="border-l-4 border-[#4A5D3A] bg-[#F5F1E8] p-6 text-left">
            <p className="text-[#5C4A35] leading-relaxed">
              <strong className="text-[#2B1F14]">Pentru certitudine</strong>{" "}
              privind programul slujbelor, vă rugăm să sunați la mănăstire la
              numărul <a href="tel:+40763785579" className="text-[#6B1D2A] hover:underline">+40 763 785 579</a>.
            </p>
            <p className="text-[#5C4A35] leading-relaxed mt-4">
              Mănăstirea este deschisă pentru închinare zilnic între orele
              <strong> 08:00–13:00</strong> și <strong>16:00–19:00</strong>.
              Între orele 13:00 și 16:00 este timpul de liniște și rugăciune al obștii.
            </p>
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
                  <strong className="font-500">16:00–19:00</strong>.
                </p>
                <p className="mt-2 text-text-muted text-[0.8125rem] max-w-none">
                  Între orele 13:00 și 16:00 este timpul de liniște și rugăciune
                  al obștii. Vă rugăm să respectați programul de odihnă.
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
