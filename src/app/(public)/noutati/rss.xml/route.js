import { getPublishedCuvinte } from "@/lib/mdx";

const SITE_URL = "https://manastirea-sfefrem.ro";
const FEED_TITLE =
  "Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou — Cuvinte duhovnicești";
const FEED_DESCRIPTION =
  "Vieți de sfinți, mărturii, cuvinte de folos și anunțuri de la Mănăstirea Sf. Efrem din Târgușor, Constanța.";

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getPublishedCuvinte();

  const items = articles
    .map(({ frontmatter, slug }) => {
      const link = `${SITE_URL}/noutati/${slug}`;
      const pubDate = new Date(frontmatter.data).toUTCString();

      return `    <item>
      <title>${escapeXml(frontmatter.titlu)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(frontmatter.descriere || "")}</description>
      ${frontmatter.autor ? `<author>${escapeXml(frontmatter.autor)}</author>` : ""}
      ${frontmatter.categorie ? `<category>${escapeXml(frontmatter.categorie)}</category>` : ""}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/noutati</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>ro</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/noutati/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
