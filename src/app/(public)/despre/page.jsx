import fs from "fs";
import path from "path";
import Link from "next/link";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import Card from "@/components/ui/Card";
import StructuredData, { buildBreadcrumbList } from "@/components/StructuredData";
import LightboxGallery from "@/components/ui/LightboxGallery";

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA
   ═══════════════════════════════════════════════════════════════ */

export const metadata = {
  title:
    "Despre Mănăstirea Sf. Dionisie și Sf. Efrem cel Nou · Istoric și viața de obște",
  description:
    "Mănăstire ortodoxă de maici înființată în 2011 în Dobrogea Centrală, sub povățuirea Maicii starețe Evghenia și a Părintelui duhovnic Ghenadie Mogoi.",
  keywords: [
    "mănăstirea sfântul efrem cel nou târgușor",
    "mănăstirea dionisie exiguul constanța",
    "maica evghenia târgușor",
    "cuvioasa macaria nea makri",
    "sf dionisie cel smerit",
  ],
  openGraph: {
    title:
      "Despre Mănăstirea Sf. Dionisie și Sf. Efrem cel Nou",
    description:
      "Istoric, viața de obște, hramuri și povățuitorii Mănăstirii Sfinților Dionisie Exiguul și Efrem cel Nou din Târgușor, Constanța.",
    type: "website",
    locale: "ro_RO",
  },
  alternates: { canonical: "/despre" },
};

/* ═══════════════════════════════════════════════════════════════
   PAGINA „DESPRE"
   ═══════════════════════════════════════════════════════════════ */

export default function DesprePage() {
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  let imageFiles = [];
  try {
    imageFiles = fs.readdirSync(imagesDirectory);
  } catch (err) {
    console.error("Could not read images directory:", err);
  }
  
  const galleryImages = imageFiles
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .filter((file) => !file.includes("og-default"))
    .map((file) => `/images/${file}`);

  return (
    <>
      <StructuredData
        data={buildBreadcrumbList([
          { name: "Acasă", url: "/" },
          { name: "Despre" },
        ])}
      />
      {/* ─────────────────────────────────────────────────────────
          1. TITLU ȘI HERO TEXT
          ───────────────────────────────────────────────────────── */}
      <section id="despre-hero" className="py-12 md:py-16">
        <div className="container-page max-w-[65ch]">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-3">
            Istoric și prezentare
          </p>
          <h1>Despre Mănăstirea noastră</h1>
          <p className="mt-4 text-scripture text-text-secondary text-[1.125rem] max-w-none">
            <em>
              O obște de maici sub ocrotirea celor doi sfinți părinți
            </em>
          </p>
        </div>
      </section>

      <CrossSeparator />

      {/* ─────────────────────────────────────────────────────────
          2. ÎNFIINȚARE ȘI ISTORIC
          ───────────────────────────────────────────────────────── */}
      <section id="istoric" className="py-8 md:py-12">
        <div className="container-page max-w-[65ch]">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-2">
            Început
          </p>
          <h2 className="mb-6">Înființare și istoric</h2>

          <div className="space-y-5">
            <p>
              Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou a
              fost înființată în anul 2011 ca răspuns la o chemare tainică
              a harului, în mijlocul Dobrogei Centrale. Ridicată în zona
              Gura Dobrogei, într-un ținut de liniște, cu aer curat și cer
              deschis, mănăstirea a luat naștere din credință, trudă și
              jertfă.
            </p>

            <p>
              Construcția a început pe 10 iulie 2011 — de atunci, peste
              14 ani de trudă, de muncă, de jertfă și de rugăciune au
              ridicat din piatră și lemn un loc de nevoință și mângâiere
              pentru sufletele care caută pe Dumnezeu.
            </p>

            {/* Citat Părintele Arsenie */}
            <blockquote className="my-8 pl-5 border-l-3 border-gold">
              <p className="text-scripture text-[1.0625rem] text-text max-w-none">
                «Dacă aveți un bănuț strâns, porniți construcția
                mănăstirii. Dacă nu aveți, mai stați puțin. O să mă rog
                pentru voi.»
              </p>
              <footer className="mt-3 text-[0.8125rem] font-body text-text-muted not-italic">
                — Părintele Arsenie Papacioc
                <span className="block text-[0.75rem] mt-0.5">
                  Duhovnicul de la malul Mării Negre, mutat la Domnul
                  în 19 iulie 2011
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ─────────────────────────────────────────────────────────
          3. CEI DOI HRAMURI
          ───────────────────────────────────────────────────────── */}
      <section id="hramuri" className="py-8 md:py-12">
        <div className="container-page">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-2 text-center">
            Hramurile mănăstirii
          </p>
          <h2 className="text-center mb-10">Cei doi ocrotitori</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sf. Dionisie */}
            <Card as="article">
              <Cross size={18} className="text-gold mb-3" />
              <h3>Sf. Cuvios Dionisie cel Smerit</h3>
              <span className="block text-[0.75rem] font-body font-500 text-grena mt-1 mb-4">
                Prăznuire: 1 septembrie — începutul Indictionului
                bisericesc
              </span>

              <div className="space-y-3">
                <p className="text-[0.9375rem]">
                  Românul care a sfințit Apusul cu înțelepciunea sa.
                  Călugăr și savant din Scythia Minor (Dobrogea), a trăit
                  la Roma în secolele V–VI, unde a stabilit numărătoarea
                  anilor de la Nașterea Domnului nostru Iisus Hristos —
                  numărătoare folosită în întreaga lume creștină până
                  astăzi.
                </p>
              </div>

              <Link
                href="/despre/sf-dionisie-exiguul"
                className="mt-5 inline-block text-[0.875rem] font-body font-500 text-olive hover:text-text transition-colors duration-200"
              >
                {"Citește viața completă \u2192"}
              </Link>
            </Card>

            {/* Sf. Efrem */}
            <Card as="article">
              <Cross size={18} className="text-gold mb-3" />
              <h3>Sf. Mare Mucenic Efrem cel Nou</h3>
              <span className="block text-[0.75rem] font-body font-500 text-grena mt-1 mb-4">
                Prăznuire: 5 mai
              </span>

              <div className="space-y-3">
                <p className="text-[0.9375rem]">
                  Descoperit pe 3 ianuarie 1950 de Cuvioasa Macaria la
                  Mănăstirea Buna Vestire din Nea Makri, Grecia. Numit
                  Constantin la naștere, a primit numele Efrem la
                  călugărie în cinstea Sf. Efrem Sirul (28 ianuarie).
                </p>
                <p className="text-[0.9375rem]">
                  Grabnic ajutător în necazuri, boli grele, dependențe și
                  situații fără rezolvare lumească — ocrotitor și
                  mijlocitor pentru mii de credincioși.
                </p>
              </div>

              <Link
                href="/sfinte-moaste/sf-efrem-cel-nou"
                className="mt-5 inline-block text-[0.875rem] font-body font-500 text-olive hover:text-text transition-colors duration-200"
              >
                {"Citește mai mult \u2192"}
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ─────────────────────────────────────────────────────────
          4. VIAȚA DE OBȘTE
          ───────────────────────────────────────────────────────── */}
      <section id="viata-de-obste" className="py-8 md:py-12">
        <div className="container-page max-w-[65ch]">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-2">
            Rânduiala zilei
          </p>
          <h2 className="mb-6">Viața de obște</h2>

          <div className="space-y-5 mb-8">
            <p>
              Obștea urmează o rânduială echilibrată după tradiția
              athonită, în care rugăciunea, slujirea tainică și ascultarea
              sfințesc fiecare zi. Sfânta Liturghie este săvârșită de
              patru ori pe săptămână, iar în posturi și sărbători — mai
              des.
            </p>
            <p>
              Postul se ține miercurea, vinerea și lunea, iar alimentația
              este exclusiv de post, cu excepția praznicelor. Chiliile,
              trapeza, biserica și paraclisul de iarnă sunt deopotrivă
              locuri de nevoință și mângâiere.
            </p>
          </div>

          <ul className="space-y-4">
            {[
              "Sfânta Liturghie de patru ori pe săptămână",
              "Post miercurea, vinerea și lunea",
              "Alimentație exclusiv de post, cu excepția praznicelor",
              "Rugăciune, ascultare și muncă după rânduiala athonită",
              "Vecernia zilnică și Paraclisul Maicii Domnului",
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <Cross
                  size={12}
                  className="text-gold shrink-0 mt-1.5"
                />
                <span className="text-[0.9375rem] text-text-secondary">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CrossSeparator />

      {/* ─────────────────────────────────────────────────────────
          5. POVĂȚUITORII OBȘTII
          ───────────────────────────────────────────────────────── */}
      <section id="povatuitori" className="py-8 md:py-12">
        <div className="container-page">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-2 text-center">
            Sub povățuire
          </p>
          <h2 className="text-center mb-10">
            Povățuitorii obștii
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Maica Stareță Evghenia */}
            <Card as="article">
              <Cross size={18} className="text-gold mb-3" />
              <h3 className="text-base font-heading font-600 text-text">
                Maica Stareță Evghenia
              </h3>
              <span className="block text-[0.75rem] font-body font-500 text-olive mt-1 mb-4">
                Stareța mănăstirii
              </span>

              <div className="space-y-3">
                <p className="text-[0.875rem] text-text-secondary max-w-none">
                  Înzestrată de Dumnezeu cu voce și cunoașterea muzicii
                  psaltice, Maica Evghenia a studiat un an muzică
                  psaltică la Atena cu Domnul Protopsalt Nonis. Vocea
                  sa clară, cu rezonanță, duioasă, face ca slujbele să
                  ducă sufletele la cele mai înalte trăiri
                  duhovnicești.
                </p>
                <p className="text-[0.8125rem] text-text-muted max-w-none">
                  Ocrotită de Sfânta Cuvioasă Muceniță Evghenia
                  (24 decembrie).
                </p>
              </div>
            </Card>

            {/* Părintele Ghenadie */}
            <Card as="article">
              <Cross size={18} className="text-gold mb-3" />
              <h3 className="text-base font-heading font-600 text-text">
                Părintele Ghenadie Mogoi
              </h3>
              <span className="block text-[0.75rem] font-body font-500 text-olive mt-1 mb-4">
                Protosinghel — Părinte slujitor și duhovnic
              </span>

              <div className="space-y-3">
                <p className="text-[0.875rem] text-text-secondary max-w-none">
                  Părinte slujitor și duhovnic al mănăstirii, a primit
                  harul preoției în Sfânta și Marea Joi, acum 15 ani,
                  prin mâinile Înaltpreasfințitului Părinte Teodosie,
                  Arhiepiscopul Tomisului.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ─────────────────────────────────────────────────────────
          6. CITAT DUHOVNICESC
          ───────────────────────────────────────────────────────── */}
      <section id="chemare" className="py-10 md:py-16">
        <div className="container-page max-w-2xl text-center">
          <Cross size={24} className="text-gold mx-auto mb-6" />

          <p className="text-scripture text-[1.375rem] md:text-[1.75rem] text-grena leading-relaxed max-w-none">
            «Vino și vezi»
          </p>
          <p className="text-[0.8125rem] font-body text-text-muted mt-1 mb-8">
            Ioan 1, 46
          </p>

          <p className="text-scripture text-[1.0625rem] md:text-[1.1875rem] text-text-secondary leading-relaxed max-w-[55ch] mx-auto">
            «Vino pentru o zi de rugăciune. Vino pentru o săptămână
            de tăcere. Vino pentru o lună de ascultare. Și dacă inima
            ta simte că aici e locul rânduit de Dumnezeu, rămâi.»
          </p>
        </div>
      </section>

      <CrossSeparator />

      {/* ─────────────────────────────────────────────────────────
          7. BOTEZURI, LOGODNE ȘI CUNUNII
          ───────────────────────────────────────────────────────── */}
      <section id="reguli-taine" className="py-10 md:py-16">
        <div className="container-page">
          <div className="max-w-[75ch] mx-auto text-center mb-10">
            <h2 className="mb-6 uppercase text-grena text-[1.375rem] md:text-[1.75rem]">
              Botezuri, logodne și cununii<br />la Mănăstirea Sfinților Dionisie și Efrem
            </h2>
            <p className="text-[1.0625rem] leading-relaxed text-text">
              Venind întru întâmpinarea oricărei posibile solicitări în acest sens, aducem la cunoștința tuturor celor interesați fidelitatea neînclintită a Mănăstirii față de Hotărârea Sfântului Sinod nr. 311 din 28 februarie 2013, care stabilește fără echivoc <strong>interdicția oficierii de botezuri, logodne și cununii</strong> în bisericile așezămintelor monahale (mănăstiri și schituri) de pe întreg cuprinsul Patriarhiei Române.
            </p>
          </div>
          
          <LightboxGallery images={galleryImages} />
        </div>
      </section>

      <CrossSeparator />

      {/* ─────────────────────────────────────────────────────────
          8. CRUCE FINAL ȘI CTA SUBTIL
          ───────────────────────────────────────────────────────── */}
      <section id="cta-final" className="py-10 md:py-14">
        <div className="container-page max-w-xl text-center">
          <Cross size={36} className="text-gold mx-auto mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link
              href="/program-slujbe"
              className="text-[0.9375rem] font-body font-500 text-olive hover:text-text transition-colors duration-200"
            >
              {"Programul slujbelor \u2192"}
            </Link>
            <span
              className="hidden sm:block w-px h-5 bg-border"
              aria-hidden="true"
            />
            <Link
              href="/viziteaza"
              className="text-[0.9375rem] font-body font-500 text-olive hover:text-text transition-colors duration-200"
            >
              {"Vizitează-ne \u2192"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
