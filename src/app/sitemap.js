import { getAllSlugs, getPublishedCuvinte } from "@/lib/mdx";

const BASE_URL = "https://manastireasfintilordionisiesiefrem.ro";

export default async function sitemap() {
  /* ─── Pagini statice ─── */
  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/despre`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE_URL}/program-slujbe`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sfinte-moaste`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/viziteaza`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/noutati`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  /* ─── Fișele de moaște (yearly) ─── */
  const moasteSlugs = getAllSlugs("moaste");
  const moastePages = moasteSlugs.map((slug) => ({
    url: `${BASE_URL}/sfinte-moaste/${slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  /* ─── Fișele despre (yearly) ─── */
  const despreSlugs = getAllSlugs("despre");
  const desprePages = despreSlugs.map((slug) => ({
    url: `${BASE_URL}/despre/${slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  /* ─── Cuvinte / Noutăți — doar publicate (monthly) ─── */
  const cuvinte = getPublishedCuvinte();
  const cuvintePages = cuvinte.map(({ slug, frontmatter }) => ({
    url: `${BASE_URL}/noutati/${slug}`,
    lastModified: frontmatter.data
      ? new Date(frontmatter.data).toISOString()
      : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...moastePages, ...desprePages, ...cuvintePages];
}
