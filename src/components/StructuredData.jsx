/**
 * StructuredData — Server Component care emite JSON-LD.
 * Usage: <StructuredData data={schemaObject} />
 */
export default function StructuredData({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCHEMA BUILDERS — funcții pure care generează obiecte JSON-LD
   ═══════════════════════════════════════════════════════════════ */

const BASE_URL = "https://manastireasfintilordionisiesiefrem.ro";
const ORG_NAME = "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou";

/** PlaceOfWorship — homepage, /viziteaza */
export function buildPlaceOfWorship() {
  return {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    name: ORG_NAME,
    alternateName: "Mănăstirea Sf. Efrem cel Nou Târgușor",
    description:
      "Mănăstire ortodoxă de maici cu viață de obște din Dobrogea Centrală, adăpostind moaștele Sf. Efrem cel Nou, Sf. Luca al Crimeei și Icoana Maicii Domnului Grabnic Ascultătoare.",
    url: BASE_URL,
    telephone: "+40763785579",
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
      latitude: 44.4675,
      longitude: 28.4889,
    },
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
        closes: "19:00",
      },
    ],
  };
}

/** BreadcrumbList — pe pagini non-homepage */
export function buildBreadcrumbList(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${BASE_URL}${item.url}` : undefined,
    })),
  };
}

/** Article — pe /noutati/[slug] */
export function buildArticle({ title, date, description, image, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: date,
    description,
    url: `${BASE_URL}${url}`,
    author: {
      "@type": "Organization",
      name: ORG_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
    ...(image && { image: `${BASE_URL}${image}` }),
  };
}

/** FAQPage — pe /viziteaza */
export function buildFAQPage(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/** Event — pentru praznice */
export function buildEvent({ name, date, description, isHram = false }) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate: date,
    description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: ORG_NAME,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Comuna Târgușor",
        addressRegion: "Constanța",
        addressCountry: "RO",
      },
    },
    organizer: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
  };
}
