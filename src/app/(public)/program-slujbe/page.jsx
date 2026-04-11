import Link from "next/link";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import Card from "@/components/ui/Card";
import StructuredData, { buildBreadcrumbList, buildEvent } from "@/components/StructuredData";

export const revalidate = 3600; // ISR: revalidare la 1 oră

export const metadata = {
  title: "Programul Sfintelor Slujbe",
  description:
    "Programul săptămânal al sfintelor slujbe și praznicele apropiate la Mănăstirea Sf. Dionisie Exiguul și Sf. Efrem cel Nou, Târgușor, Constanța.",
  alternates: { canonical: "/program-slujbe" },
};

/* ─── Constante ─── */

const ZILELE = [
  "Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă",
];

// Ordine afișare: Lu-Mi-Vi-Du / Ma-Jo-Sâ (busier days left)
const COL_STANGA = [1, 3, 5, 0]; // Luni, Miercuri, Vineri, Duminică
const COL_DREAPTA = [2, 4, 6];   // Marți, Joi, Sâmbătă

/* ─── Date fallback (când Supabase nu e configurat) ─── */

const FALLBACK_SLUJBE = [
  { zi_saptamana: 0, ora: "09:00", denumire: "Ceasurile III, VI și Sfânta Liturghie", tip: "liturghie" },
  { zi_saptamana: 0, ora: "17:00", denumire: "Paraclisul Maicii Domnului", tip: "paraclis" },
  { zi_saptamana: 1, ora: "17:00", denumire: "Vecernia", tip: "vecernie" },
  { zi_saptamana: 2, ora: "17:00", denumire: "Vecernia", tip: "vecernie" },
  { zi_saptamana: 3, ora: "09:00", denumire: "Ceasurile III, VI și Sfânta Liturghie", tip: "liturghie" },
  { zi_saptamana: 3, ora: "17:00", denumire: "Vecernia", tip: "vecernie" },
  { zi_saptamana: 4, ora: "17:00", denumire: "Vecernia", tip: "vecernie" },
  { zi_saptamana: 5, ora: "09:00", denumire: "Ceasurile III, VI și Sfânta Liturghie", tip: "liturghie" },
  { zi_saptamana: 5, ora: "17:00", denumire: "Vecernia", tip: "vecernie" },
  { zi_saptamana: 6, ora: "09:00", denumire: "Ceasurile III, VI și Sfânta Liturghie", tip: "liturghie" },
  { zi_saptamana: 6, ora: "17:00", denumire: "Vecernia", tip: "vecernie" },
];

const FALLBACK_PRAZNICE = [];

/* ─── Data fetching ─── */

async function getSlujbe() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return FALLBACK_SLUJBE;
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("slujbe")
      .select("*")
      .eq("activ", true)
      .order("ordine", { ascending: true });
    if (error) throw error;
    return data || FALLBACK_SLUJBE;
  } catch {
    return FALLBACK_SLUJBE;
  }
}

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

function groupByZi(slujbe) {
  const grouped = {};
  for (let i = 0; i < 7; i++) grouped[i] = [];
  slujbe.forEach((s) => grouped[s.zi_saptamana].push(s));
  return grouped;
}

/* ─── Componente locale ─── */

function ZiSection({ zi, slujbe }) {
  return (
    <div className="mb-8">
      <h3 className="text-grena mb-3">{ZILELE[zi]}</h3>
      {slujbe.length === 0 ? (
        <p className="text-text-muted text-[0.875rem]">—</p>
      ) : (
        <ul className="space-y-2">
          {slujbe.map((s, i) => (
            <li key={i} className="flex gap-3 items-baseline">
              <span className="text-olive font-body font-600 text-[0.875rem] tabular-nums w-14 shrink-0">
                {formatOra(s.ora)}
              </span>
              <div>
                <span className="text-text text-[0.9375rem] font-body">
                  {s.denumire}
                </span>
                {s.detalii && (
                  <span className="block text-[0.8125rem] text-text-muted mt-0.5">
                    {s.detalii}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
  const [slujbe, praznice] = await Promise.all([getSlujbe(), getPraznice()]);
  const grouped = groupByZi(slujbe);

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
      {/* ═══ INTRO ═══ */}
      <section className="py-12 md:py-16">
        <div className="container-page max-w-[65ch]">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-3">
            Rânduiala mănăstirii
          </p>
          <h1>Programul Sfintelor Slujbe</h1>
          <p className="mt-4">
            Sfânta Liturghie se săvârșește de patru ori pe săptămână — miercuri,
            vineri, sâmbătă și duminică. Vecernia este zilnică, la ora 17:00.
            În posturi și sărbători, programul se poate modifica; praznicele
            apropiate sunt listate mai jos.
          </p>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ PROGRAM SĂPTĂMÂNAL ═══ */}
      <section id="program-saptamanal" className="py-8 md:py-12">
        <div className="container-page">
          <h2 className="mb-8">Program săptămânal</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {/* Coloana stânga: Lu, Mi, Vi, Du */}
            <div>
              {COL_STANGA.map((zi) => (
                <ZiSection key={zi} zi={zi} slujbe={grouped[zi]} />
              ))}
            </div>

            {/* Coloana dreapta: Ma, Jo, Sâ */}
            <div>
              {COL_DREAPTA.map((zi) => (
                <ZiSection key={zi} zi={zi} slujbe={grouped[zi]} />
              ))}
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
