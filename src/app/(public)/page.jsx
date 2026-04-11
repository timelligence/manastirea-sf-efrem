import Link from "next/link";
import Image from "next/image";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import FacebookFeed from "@/components/FacebookFeed";
import StructuredData, { buildPlaceOfWorship } from "@/components/StructuredData";

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA
   ═══════════════════════════════════════════════════════════════ */
export const metadata = {
  title:
    "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou — Târgușor, Constanța",
  description:
    "Mănăstire ortodoxă de maici din Dobrogea Centrală, sub ocrotirea Sf. Dionisie cel Smerit și a Sf. Mare Mucenic Efrem cel Nou. Program slujbe, sfinte moaște, cuvinte duhovnicești.",
  openGraph: {
    title:
      "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou",
    description:
      "Mănăstire de maici cu viață de obște. Comuna Târgușor, Constanța, Dobrogea Centrală. Sfinte moaște, program slujbe, cuvinte duhovnicești.",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou — Târgușor, Constanța",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
};

/* ═══════════════════════════════════════════════════════════════
   DATE STATICE
   ═══════════════════════════════════════════════════════════════ */

const MOASTE_PREVIEW = [
  {
    titlu: "Sf. Mare Mucenic Efrem cel Nou",
    descriere:
      "Grabnic ajutător în necazuri, boli grele, dependențe și situații fără rezolvare lumească. Moaștele au fost descoperite în 1950 de Cuvioasa Macaria.",
    href: "/sfinte-moaste/sf-efrem-cel-nou",
    praznuire: "5 mai",
  },
  {
    titlu: "Sf. Ierarh Luca al Crimeei",
    descriere:
      "Arhiepiscop, chirurg și mărturisitor. Ocrotitor al medicilor, al bolnavilor și al celor ce așteaptă operații sau diagnostic.",
    href: "/sfinte-moaste/sf-luca-al-crimeei",
    praznuire: "11 iunie",
  },
  {
    titlu: "Icoana Maicii Domnului «Grabnic Ascultătoare»",
    descriere:
      "Copie pictată la Muntele Athos, de la Mănăstirea Dohiariu. Maica Domnului ascultă grabnic rugăciunile celor aflați în primejdie.",
    href: "/sfinte-moaste/icoana-grabnic-ascultatoare",
    praznuire: "9 noiembrie",
  },
];

const CUVINTE_RECENTE = [
  {
    titlu: "Sfântul Dionisie cel Smerit — românul care a sfințit Apusul",
    extras:
      "Călugăr și savant din Dobrogea, Sfântul Dionisie a stabilit numărătoarea anilor de la Nașterea Domnului și a tradus canoanele Sinoadelor...",
    data: "2 aprilie 2026",
    href: "/noutati/sf-dionisie-cel-smerit-romanul-care-a-sfintit-apusul",
  },
  {
    titlu: "Sfântul Efrem — purtător al dorințelor credincioșilor",
    extras:
      "Sfântul Efrem cel Nou se arată Cuvioasei Macaria ținând în mâini haina plină de înscrisuri — dorințele credincioșilor pe care le duce la Hristos...",
    data: "28 martie 2026",
    href: "/noutati/sf-efrem-purtator-al-dorintelor-credinciosilor",
  },
  {
    titlu: "Cum a descoperit Cuvioasa Macaria moaștele Sfântului Efrem",
    extras:
      "Povestea descoperirii din 3 ianuarie 1950, când stareța Macaria a săpat în locul arătat de un glas tainic și a aflat trupul neputrezit al sfântului...",
    data: "15 martie 2026",
    href: "/noutati/cum-a-descoperit-cuvioasa-macaria-moastele",
  },
];

/* ═══════════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      {/* PlaceOfWorship JSON-LD */}
      <StructuredData data={buildPlaceOfWorship()} />

      {/* ─────────────────────────────────────────────────────────
          1. HERO — Imagine reală drone + overlay gradient
          ───────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ height: "85vh", minHeight: "600px" }}
      >
        <Image
          src="/images/hero-drone.jpg"
          alt="Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou, vedere aeriană — Dobrogea Centrală"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Overlay gradient: transparent sus → maro-ivoriu jos */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(43,31,20,0.15) 0%, rgba(43,31,20,0.35) 30%, rgba(43,31,20,0.65) 55%, rgba(43,31,20,0.88) 80%, rgba(43,31,20,0.95) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Conținut text aliniat jos */}
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-5xl px-6 pb-14 md:pb-20">
            <p className="text-[0.8125rem] uppercase tracking-[0.2em] font-body font-500 mb-4"
               style={{ color: 'rgba(245,241,232,0.8)' }}>
              Dobrogea Centrală · Comuna Târgușor
            </p>

            <h1 className="font-heading text-[2.5rem] md:text-[3.5rem] lg:text-[4.25rem] leading-[1.1] mb-6 max-w-3xl"
                style={{ color: '#F5F1E8' }}>
              Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou
            </h1>

            <p className="font-heading italic text-xl md:text-2xl mb-10"
               style={{ color: 'rgba(245,241,232,0.9)' }}>
              {"«Vino și vezi» — Ioan 1, 46"}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/program-slujbe"
                className="inline-flex items-center px-6 py-3 bg-grena text-[0.9375rem] font-body font-500 hover:bg-[#7a2532] transition-colors duration-200"
                style={{ color: '#F5F1E8' }}
              >
                Programul slujbelor
              </Link>
              <Link
                href="/viziteaza"
                className="inline-flex items-center px-6 py-3 border text-[0.9375rem] font-body font-500 hover:bg-[#F5F1E8]/10 transition-colors duration-200"
                style={{ color: '#F5F1E8', borderColor: 'rgba(245,241,232,0.6)' }}
              >
                Vino să ne vizitezi
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
          2. CUVÂNT DE BUN VENIT
          ───────────────────────────────────────────────────────── */}
      <section id="bun-venit" className="py-20 md:py-28 bg-primary">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-4">
            Bun venit
          </p>
          <h2 className="font-heading text-[2rem] md:text-[2.5rem] text-text mb-10">
            Un loc de rugăciune în inima Dobrogei
          </h2>

          <div className="space-y-6 text-[1.0625rem] text-text-secondary leading-relaxed text-left md:text-center">
            <p className="max-w-none">
              Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou a fost
              întemeiată în anul 2011 pe un deal lin din Dobrogea Centrală,
              la marginea comunei Târgușor, în apropiere de localitatea
              Gura Dobrogei. Sub povățuirea Maicii Starețe Evghenia și a
              Părintelui duhovnic Ghenadie Mogoi, obștea de maici trăiește
              în rugăciune, ascultare și muncă, urmând rânduiala monahală
              de obște.
            </p>

            <p className="max-w-none">
              Mănăstirea poartă hramul a doi sfinți deosebiți: Cuviosul
              Dionisie Exiguul, românul care a stabilit numărătoarea anilor
              de la Nașterea Domnului, și Sfântul Mare Mucenic Efrem cel Nou,
              descoperit în chip minunat în 1950 la Nea Makri, în Grecia.
              Amândoi ocrotesc acest loc și pe cei care vin aici cu credință.
            </p>

            <p className="max-w-none">
              Vă așteptăm cu dragoste frățească, să vă închinați la sfintele
              moaște, să participați la sfintele slujbe și să gustați din
              liniștea acestui loc binecuvântat. Porțile mănăstirii sunt
              deschise oricui caută un ceas de rugăciune și alinare.
            </p>
          </div>
        </div>
      </section>

      <CrossSeparator />


      {/* ─────────────────────────────────────────────────────────
          3. RÂNDUIALA SĂPTĂMÂNII — doar Duminica confirmată
          ───────────────────────────────────────────────────────── */}
      <section id="program-scurt" className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="bg-secondary border border-border p-8 md:p-14">
            <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive text-center mb-3">
              Programul slujbelor
            </p>
            <h2 className="font-heading text-[1.75rem] md:text-[2.25rem] text-text text-center mb-10">
              Rânduiala săptămânii
            </h2>

            <p className="text-text text-[1.0625rem] leading-relaxed text-center max-w-none">
              Sfânta Liturghie se săvârșește duminica de la ora 9. Programul
              detaliat al celorlalte zile, precum și al privegherilor de
              praznice, va fi actualizat în curând. Pentru detalii sunați la{" "}
              <a
                href="tel:+40763785579"
                className="text-grena font-body font-500 hover:text-text transition-colors duration-200"
              >
                +40 763 785 579
              </a>
              .
            </p>

            <div className="mt-10 pt-8 border-t border-border text-center">
              <Link
                href="/program-slujbe"
                className="text-grena text-[0.9375rem] font-body font-500 hover:text-text transition-colors duration-200"
              >
                {"Program complet și praznice apropiate \u2192"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CrossSeparator />


      {/* ─────────────────────────────────────────────────────────
          4. CEI DOI OCROTITORI
          ───────────────────────────────────────────────────────── */}
      <section id="ocrotitori" className="py-20 md:py-28 bg-secondary/50">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive text-center mb-3">
            Hramurile mănăstirii
          </p>
          <h2 className="font-heading text-[2rem] md:text-[2.5rem] text-text text-center mb-14">
            Cei doi ocrotitori
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sf. Dionisie */}
            <article className="bg-primary border border-border p-8 md:p-10 hover:border-gold transition-colors duration-200">
              <div className="flex justify-center mb-6">
                <Cross size={36} className="text-gold" />
              </div>
              <h3 className="font-heading text-[1.5rem] md:text-[1.75rem] text-text text-center mb-3">
                Sf. Cuvios Dionisie cel Smerit
              </h3>
              <p className="text-center text-grena font-heading italic text-[0.9375rem] mb-6">
                Prăznuire: 1 septembrie · Începutul Indictionului bisericesc
              </p>
              <p className="text-text-secondary text-[1rem] leading-relaxed mb-6 max-w-none">
                Dionisie Exiguul, călugăr și savant de origine română
                din Scythia Minor (Dobrogea), a trăit la Roma în
                secolele V–VI. Este cel care a stabilit numărătoarea
                anilor de la Nașterea Domnului nostru Iisus Hristos,
                numărătoare folosită în întreaga lume creștină până astăzi.
              </p>
              <Link
                href="/despre/sf-dionisie-exiguul"
                className="text-grena text-[0.9375rem] font-body font-500 hover:text-text transition-colors duration-200"
              >
                {"Citește viața completă \u2192"}
              </Link>
            </article>

            {/* Sf. Efrem */}
            <article className="bg-primary border border-border p-8 md:p-10 hover:border-gold transition-colors duration-200">
              <div className="flex justify-center mb-6">
                <Cross size={36} className="text-gold" />
              </div>
              <h3 className="font-heading text-[1.5rem] md:text-[1.75rem] text-text text-center mb-3">
                Sf. Mare Mucenic Efrem cel Nou
              </h3>
              <p className="text-center text-grena font-heading italic text-[0.9375rem] mb-6">
                Prăznuire: 5 mai
              </p>
              <p className="text-text-secondary text-[1rem] leading-relaxed mb-6 max-w-none">
                Sfânt descoperit în chip minunat în anul 1950 la Nea Makri,
                în Grecia, de Cuvioasa Macaria. Grabnic ajutător în
                necazuri, boli grele, dependențe și situații fără rezolvare
                lumească — ocrotitor și mijlocitor pentru mii de credincioși
                din întreaga lume ortodoxă.
              </p>
              <Link
                href="/sfinte-moaste/sf-efrem-cel-nou"
                className="text-grena text-[0.9375rem] font-body font-500 hover:text-text transition-colors duration-200"
              >
                {"Citește mai mult \u2192"}
              </Link>
            </article>
          </div>
        </div>
      </section>

      <CrossSeparator />


      {/* ─────────────────────────────────────────────────────────
          5. SFINTELE MOAȘTE ȘI ICOANE — grid 3 carduri
          ───────────────────────────────────────────────────────── */}
      <section id="moaste" className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive text-center mb-3">
            Comori ale credinței
          </p>
          <h2 className="font-heading text-[2rem] md:text-[2.5rem] text-text text-center mb-14">
            Sfintele Moaște și Icoane
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOASTE_PREVIEW.map(({ titlu, descriere, href, praznuire }) => (
              <article
                key={titlu}
                className="bg-primary border border-border p-8 hover:border-gold transition-colors duration-200 flex flex-col"
              >
                <Cross size={20} className="text-grena mb-4" />
                <h3 className="font-heading text-[1.25rem] text-text mb-2 leading-snug">
                  {titlu}
                </h3>
                <span className="block text-[0.8125rem] font-body font-500 text-grena mb-4">
                  Prăznuire: {praznuire}
                </span>
                <p className="text-text-secondary text-[0.9375rem] leading-relaxed mb-6 flex-grow max-w-none">
                  {descriere}
                </p>
                <Link
                  href={href}
                  className="text-grena text-[0.9375rem] font-body font-500 hover:text-text transition-colors duration-200 mt-auto"
                >
                  {"Citește fișa completă \u2192"}
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/sfinte-moaste"
              className="text-grena text-[0.9375rem] font-body font-500 hover:text-text transition-colors duration-200"
            >
              {"Toate sfintele moaște și icoane \u2192"}
            </Link>
          </div>
        </div>
      </section>

      <CrossSeparator />


      {/* ─────────────────────────────────────────────────────────
          6. CUVINTE DUHOVNICEȘTI — carduri mari
          ───────────────────────────────────────────────────────── */}
      <section id="cuvinte" className="py-20 md:py-28 bg-secondary/50">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive text-center mb-3">
            Din cuvintele mănăstirii
          </p>
          <h2 className="font-heading text-[2rem] md:text-[2.5rem] text-text text-center mb-14">
            Cuvinte duhovnicești
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUVINTE_RECENTE.map(({ titlu, extras, data, href }) => (
              <article
                key={titlu}
                className="bg-primary border border-border p-8 hover:border-gold transition-colors duration-200 flex flex-col"
              >
                <time className="text-[0.875rem] font-body text-text-muted mb-3">
                  {data}
                </time>
                <h3 className="font-heading text-[1.25rem] md:text-[1.375rem] text-text mb-4 leading-snug">
                  {titlu}
                </h3>
                <p className="text-text-secondary text-[0.9375rem] leading-relaxed mb-6 flex-grow max-w-none">
                  {extras}
                </p>
                <Link
                  href={href}
                  className="text-grena text-[0.9375rem] font-body font-500 hover:text-text transition-colors duration-200 mt-auto"
                >
                  {"Citește \u2192"}
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/noutati"
              className="text-grena text-[0.9375rem] font-body font-500 hover:text-text transition-colors duration-200"
            >
              {"Toate cuvintele duhovnicești \u2192"}
            </Link>
          </div>
        </div>
      </section>

      <CrossSeparator />


      {/* ─────────────────────────────────────────────────────────
          7. VIZITARE — 2 coloane cu imagine aeriană
          ───────────────────────────────────────────────────────── */}
      <section id="vizitare" className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="bg-primary border border-border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Coloana stânga — informații */}
              <div className="p-8 md:p-14">
                <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-3">
                  Vă așteptăm
                </p>
                <h2 className="font-heading text-[1.75rem] md:text-[2.25rem] text-text mb-8">
                  Vizitați mănăstirea
                </h2>

                <div className="space-y-5">
                  {/* Adresă */}
                  <div className="flex gap-3 items-start">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-olive shrink-0 mt-0.5" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-text-secondary text-[1rem]">
                      Comuna Târgușor, jud. Constanța<br />
                      Cod poștal 907275, România
                    </span>
                  </div>

                  {/* Telefon */}
                  <div className="flex gap-3 items-start">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-olive shrink-0 mt-0.5" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a
                      href="tel:+40763785579"
                      className="font-heading text-[1.25rem] font-500 text-text hover:text-olive transition-colors duration-200"
                    >
                      +40 763 785 579
                    </a>
                  </div>

                  {/* Program */}
                  <div className="flex gap-3 items-start">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-olive shrink-0 mt-0.5" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <span className="block text-text text-[1rem] font-body font-500">
                        Program vizitare
                      </span>
                      <span className="block text-text-secondary text-[1rem] mt-1">
                        Zilnic: 08:00–13:00 și 16:00–19:00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nota de liniște */}
                <div className="mt-8 p-5 bg-secondary border-l-4 border-olive">
                  <p className="text-[0.9375rem] text-text-secondary leading-relaxed max-w-none">
                    Între orele <strong className="text-text font-500">13:00 și 16:00</strong> este
                    timpul de liniște și rugăciune al obștii. Vă rugăm să
                    respectați programul de odihnă.
                  </p>
                </div>

                <Link
                  href="/viziteaza"
                  className="mt-8 inline-block text-grena text-[0.9375rem] font-body font-500 hover:text-text transition-colors duration-200"
                >
                  {"Hartă și indicații de drum \u2192"}
                </Link>
              </div>

              {/* Coloana dreapta — imagine aeriană */}
              <div className="relative min-h-[350px] md:min-h-full">
                <Image
                  src="/images/aerial-zenital.jpg"
                  alt="Mănăstirea văzută de sus — vedere aeriană zenitală"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CrossSeparator />


      {/* ─────────────────────────────────────────────────────────
          8. FACEBOOK FEED
          ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <FacebookFeed />
      </section>
    </>
  );
}
