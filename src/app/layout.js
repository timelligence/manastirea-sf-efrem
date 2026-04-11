import Script from "next/script";
import "./globals.css";

/* ═══════════════════════════════════════════════════════════════
   METADATA GLOBALĂ
   ═══════════════════════════════════════════════════════════════ */

export const metadata = {
  metadataBase: new URL("https://manastirea-targusor.ro"),
  title: {
    default: "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou",
    template: "%s · Mănăstirea Târgușor",
  },
  description:
    "Mănăstire ortodoxă de maici cu viață de obște, Comuna Târgușor, jud. Constanța. Adăpostește moaștele Sf. Efrem cel Nou, Sf. Luca al Crimeei, Icoana Maicii Domnului Grabnic Ascultătoare. Pelerinaj Dobrogea.",
  keywords: [
    "mănăstirea sfântul efrem cel nou târgușor",
    "mănăstirea dionisie exiguul constanța",
    "maica evghenia târgușor",
    "mănăstiri de vizitat constanța",
    "pelerinaj dobrogea",
    "mănăstiri lângă constanța",
    "mănăstiri de maici constanța",
    "sfântul efrem cel nou ajutor",
    "sfântul efrem cel nou minuni",
    "moaște sfântul efrem cel nou românia",
    "rugăciune sfântul efrem cel nou dependențe",
    "sfânt pentru dependențe droguri",
    "icoana grabnic ascultătoare",
    "cuvioasa macaria nea makri",
  ],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Mănăstirea Sf. Dionisie și Sf. Efrem cel Nou",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou — Târgușor, Constanța",
      },
    ],
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/noutati/rss.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ═══════════════════════════════════════════════════════════════
   ORGANIZATION JSON-LD — global, pe toate paginile
   ═══════════════════════════════════════════════════════════════ */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou",
  alternateName: [
    "Mănăstirea Sf. Efrem cel Nou Târgușor",
    "Mănăstirea Târgușor",
  ],
  url: "https://manastirea-targusor.ro",
  logo: "https://manastirea-targusor.ro/images/og-default.png",
  telephone: "+40763785579",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sat Gura Dobrogei",
    addressLocality: "Comuna Târgușor",
    addressRegion: "Constanța",
    postalCode: "907275",
    addressCountry: "RO",
  },
  sameAs: [
    "https://www.facebook.com/manastirea.sfefrem", // TODO: confirma URL exact
  ],
};

/* ═══════════════════════════════════════════════════════════════
   ROOT LAYOUT
   ═══════════════════════════════════════════════════════════════ */

export default function RootLayout({ children }) {
  return (
    <html lang="ro" data-scroll-behavior="smooth">
      <head>
        {/* Preload fonturi critice */}
        <link
          rel="preload"
          href="/fonts/eb-garamond-v32-latin-ext-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-v20-latin-ext-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Organization JSON-LD global */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}

        {/* ─── Plausible Analytics (opțional, controlat de env var) ─── */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src={`https://plausible.${process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || "clickstanga.ro"}/js/script.js`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
