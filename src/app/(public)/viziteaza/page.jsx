import Link from "next/link";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import Card from "@/components/ui/Card";
import MapWrapper from "@/components/MapWrapper";
import StructuredData, {
  buildBreadcrumbList,
  buildFAQPage,
} from "@/components/StructuredData";

/**
 * TODO: VERIFICĂ coordonatele exacte cu maica stareță înainte de lansare.
 */
const LAT = 44.4675;
const LNG = 28.4889;

/* ─── SEO ─── */

export const metadata = {
  title: "Vizitează Mănăstirea",
  description:
    "Adresă, hartă, program de vizitare și indicații de drum spre Mănăstirea Sf. Dionisie Exiguul & Sf. Efrem cel Nou din comuna Târgușor, jud. Constanța.",
  keywords: [
    "mănăstiri de vizitat constanța",
    "pelerinaj dobrogea",
    "mănăstiri lângă constanța",
    "mănăstiri de maici constanța",
    "cum ajung la mănăstirea târgușor",
  ],
  alternates: { canonical: "/viziteaza" },
};

/* ─── Schema.org PlaceOfWorship ─── */

const placeOfWorshipSchema = {
  "@context": "https://schema.org",
  "@type": "PlaceOfWorship",
  name: "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou",
  alternateName: "Mănăstirea Sf. Efrem cel Nou Târgușor",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sat Gura Dobrogei",
    addressLocality: "Comuna Târgușor",
    addressRegion: "Constanța",
    postalCode: "907275",
    addressCountry: "RO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: LAT,
    longitude: LNG,
  },
  telephone: "+40763785579",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "16:00",
      closes: "20:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Maica Stareță Evghenia",
  },
  foundingDate: "2011",
  image: "/images/manastire-hero.jpg",
  url: "https://manastireasfintilordionisiesiefrem.ro/viziteaza",
};

const viziteazaFAQ = [
  {
    question: "Care este programul de vizitare al mănăstirii?",
    answer:
      "Mănăstirea este deschisă zilnic pentru închinare între 08:00–13:00 și 16:00–20:00. Între 13:00 și 16:00 este timpul de liniște al obștii. De hram și de unele sărbători, poarta este deschisă 08:00–20:00.",
  },
  {
    question: "Cum ajung la Mănăstirea Sf. Efrem cel Nou din Târgușor?",
    answer:
      "Din Constanța, luați DN22B spre Târgușor (~30 km). Din București, pe A2 până la Constanța, apoi DN22B. Mănăstirea se află lângă satul Gura Dobrogei.",
  },
  {
    question: "Pot să rămân peste noapte la mănăstire?",
    answer:
      "Da, mănăstirea oferă cazare pentru pelerini. Vă rugăm să sunați înainte la +40 763 785 579 pentru a verifica disponibilitatea.",
  },
  {
    question: "Ce sfinte moaște se află la mănăstire?",
    answer:
      "Mănăstirea adăpostește părticele din moaștele Sf. Efrem cel Nou, Sf. Luca al Crimeei, Sf. Nichifor cel Lepros, Sf. Mucenița Agnia, și icoana Maicii Domnului Grabnic Ascultătoare.",
  },
];

/* ─── PAGINA ─── */

export default function ViziteazaPage() {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(placeOfWorshipSchema),
        }}
      />
      <StructuredData
        data={buildBreadcrumbList([
          { name: "Acasă", url: "/" },
          { name: "Vizitează" },
        ])}
      />
      <StructuredData data={buildFAQPage(viziteazaFAQ)} />

      {/* ═══ SECȚIUNEA 1 — TITLU ȘI INTRO ═══ */}
      <section className="py-12 md:py-16">
        <div className="container-page max-w-[65ch]">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-3">
            Dobrogea Centrală
          </p>
          <h1>Vizitează Mănăstirea</h1>
          <p className="mt-4 text-scripture text-text-secondary text-[1.0625rem] max-w-none">
            <em>
              «Pace celor ce vin, bucurie celor ce rămân, binecuvântare celor
              ce pleacă»
            </em>
          </p>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ SECȚIUNEA 2 — ADRESĂ ȘI CONTACT ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Stânga: Adresa */}
            <div>
              <h2 className="text-lg mb-4">Adresă</h2>
              <address className="not-italic text-text-secondary text-[0.9375rem] leading-relaxed">
                <strong className="text-text font-500 block">
                  Mănăstirea Sfinților Dionisie Exiguul
                </strong>
                <strong className="text-text font-500 block mb-2">
                  și Efrem cel Nou
                </strong>
                Sat Gura Dobrogei
                <br />
                Comuna Târgușor, jud. Constanța
                <br />
                Cod poștal 907275
                <br />
                România
              </address>
            </div>

            {/* Dreapta: Telefon */}
            <div>
              <h2 className="text-lg mb-4">Contact</h2>
              <a
                href="tel:+40763785579"
                className="inline-flex items-center gap-3 text-[1.5rem] md:text-[1.75rem] font-heading font-500 text-text hover:text-grena transition-colors"
              >
                <PhoneIcon />
                +40 763 785 579
              </a>
              <p className="mt-4 text-text-muted text-[0.8125rem] max-w-[40ch]">
                Pentru pomelnice, spovedanie sau vizite de grup, vă rugăm să
                sunați în prealabil.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ SECȚIUNEA 3 — HARTĂ LEAFLET ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page">
          <h2 className="text-lg mb-6">Localizare</h2>
          <MapWrapper
            lat={LAT}
            lng={LNG}
            zoom={13}
            className="h-[350px] md:h-[500px]"
          />
          <div className="mt-3 flex justify-end">
            <a
              href={`https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LNG}#map=15/${LAT}/${LNG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] font-body font-500 text-olive hover:text-text transition-colors"
            >
              {"Deschide în OpenStreetMap \u2192"}
            </a>
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ SECȚIUNEA 4 — CUM AJUNGI ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page">
          <h2 className="text-lg mb-6">Cum ajungi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <DirectionCard
              titlu="Din Constanța"
              distanta="~35 km"
              descriere="Direcția Hârșova / Tulcea (DN2A). Ieșire spre Târgușor, urmare indicatoare spre Gura Dobrogei."
            />
            <DirectionCard
              titlu="Din București"
              distanta="~240 km"
              descriere="Autostrada A2 până la Constanța, apoi DN2A direcția Hârșova. Ieșire Târgușor."
            />
            <DirectionCard
              titlu="Reper local"
              distanta=""
              descriere="Zona Gura Dobrogei, comuna Târgușor, în apropierea peșterii Gura Dobrogei. Drum asfaltat până la mănăstire."
            />
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ SECȚIUNEA 5 — PROGRAM DE VIZITARE ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page max-w-xl">
          <h2 className="text-lg mb-6 text-center">Program de vizitare</h2>

          {/* Card central */}
          <div className="text-center p-8 bg-secondary rounded-[4px] border border-border mb-5">
            <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.1em] text-olive mb-3">
              Deschis zilnic
            </p>
            <div className="flex items-center justify-center gap-6">
              <div>
                <p className="text-[1.75rem] font-heading font-600 text-text leading-tight">
                  08:00 – 13:00
                </p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-[1.75rem] font-heading font-600 text-text leading-tight">
                  16:00 – 20:00
                </p>
              </div>
            </div>
          </div>

          {/* Notă liniște */}
          <div className="p-4 rounded-[4px] border-l-3 border-olive bg-primary">
            <div className="flex gap-3 items-start">
              <Cross size={14} className="text-olive shrink-0 mt-0.5" />
              <p className="text-text-secondary text-[0.875rem] max-w-none">
                Între orele <strong className="font-500 text-text">13:00</strong>{" "}
                și <strong className="font-500 text-text">16:00</strong> este
                timpul de liniște și rugăciune al obștii. Vă rugăm să respectați
                această rânduială.
              </p>
            </div>
          </div>

          {/* Notă sărbători */}
          <div className="p-4 rounded-[4px] border-l-3 border-grena bg-primary mt-3">
            <div className="flex gap-3 items-start">
              <Cross size={14} className="text-grena shrink-0 mt-0.5" />
              <p className="text-text-secondary text-[0.875rem] max-w-none">
                De hram și de unele sărbători, mănăstirea este deschisă{" "}
                <strong className="font-500 text-grena">08:00–20:00</strong>.
                Se va anunța din timp când este deschisă poarta toată ziua.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ SECȚIUNEA 6 — RÂNDUIELI ȘI REGULI ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page max-w-[65ch]">
          <h2 className="text-lg mb-6">Rânduieli de vizitare</h2>
          <ul className="space-y-4">
            <RanduialaItem>
              <strong className="font-500 text-text">Ținută decentă</strong>{" "}
              pentru biserică — femei: fustă și batic; bărbați: pantaloni lungi.
            </RanduialaItem>
            <RanduialaItem>
              Liniște și smerenie în incinta mănăstirii.
            </RanduialaItem>
            <RanduialaItem>
              Fotografierea slujbelor doar cu binecuvântarea stareței.
            </RanduialaItem>
            <RanduialaItem important>
              <strong className="font-500 text-text">
                În pădurea din jur NU se face foc de tabără sau grătar.
              </strong>{" "}
              Incinta mănăstirii este zonă protejată.
            </RanduialaItem>
            <RanduialaItem important>
              <strong className="font-500 text-text">
                Intrarea cu mașina personală în pădure este strict interzisă.
              </strong>{" "}
              Parcarea este amenajată la intrare.
            </RanduialaItem>
          </ul>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ SECȚIUNEA 7 — CE POȚI FACE ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page max-w-[65ch]">
          <h2 className="text-lg mb-6">Ce poți face la mănăstire</h2>
          <ul className="space-y-3">
            <ActivityItem>
              Închinare la{" "}
              <Link
                href="/sfinte-moaste"
                className="text-olive font-500 underline underline-offset-2 decoration-olive/30 hover:decoration-olive transition-colors"
              >
                sfintele moaște și icoane
              </Link>
            </ActivityItem>
            <ActivityItem>
              Participare la{" "}
              <Link
                href="/program-slujbe"
                className="text-olive font-500 underline underline-offset-2 decoration-olive/30 hover:decoration-olive transition-colors"
              >
                Sfânta Liturghie și celelalte slujbe
              </Link>
            </ActivityItem>
            <ActivityItem>
              Spovedanie (cu binecuvântarea părintelui duhovnic)
            </ActivityItem>
            <ActivityItem>Pomelnice pentru vii și adormiți</ActivityItem>
            <ActivityItem>Pelerinaj individual sau de grup</ActivityItem>
          </ul>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ SECȚIUNEA 8 — CHEMARE LA VIAȚA MONAHALĂ ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page max-w-2xl">
          <div className="p-6 md:p-8 bg-stone/30 rounded-[4px] border border-border text-center">
            <Cross size={20} className="text-gold mx-auto mb-4" />
            <p className="text-text text-[1rem] font-body leading-relaxed max-w-none">
              Pentru cei care simt o chemare lăuntrică spre viața monahală: vino
              pentru o zi, o săptămână, o lună.{" "}
              <em className="text-scripture">
                «Vino și vezi» (Ioan 1, 46)
              </em>
              .
            </p>
            <p className="mt-3 text-text-muted text-[0.8125rem]">
              Pentru detalii, vorbește cu maica stareță.
            </p>
            <a
              href="tel:+40763785579"
              className="inline-flex items-center gap-2 mt-4 text-[0.875rem] font-body font-500 text-olive hover:text-text transition-colors"
            >
              <PhoneIcon size={14} />
              +40 763 785 579
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Componente locale ─── */

function DirectionCard({ titlu, distanta, descriere }) {
  return (
    <Card className="flex flex-col">
      <h3 className="text-base font-heading font-600 text-text mb-1">
        {titlu}
      </h3>
      {distanta && (
        <span className="text-[0.75rem] font-body font-500 text-olive mb-3">
          {distanta}
        </span>
      )}
      <p className="text-[0.875rem] text-text-secondary flex-1 max-w-none">
        {descriere}
      </p>
    </Card>
  );
}

function RanduialaItem({ children, important = false }) {
  return (
    <li className="flex gap-3 items-start">
      <Cross
        size={12}
        className={`shrink-0 mt-1 ${important ? "text-grena" : "text-gold"}`}
      />
      <span
        className={`text-[0.9375rem] leading-relaxed ${
          important ? "text-text" : "text-text-secondary"
        }`}
      >
        {children}
      </span>
    </li>
  );
}

function ActivityItem({ children }) {
  return (
    <li className="flex gap-3 items-start">
      <Cross size={10} className="text-gold shrink-0 mt-1.5" />
      <span className="text-[0.9375rem] text-text-secondary">{children}</span>
    </li>
  );
}

function PhoneIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
