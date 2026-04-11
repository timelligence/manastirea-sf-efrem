import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

/**
 * Returnează toate fișierele MDX dintr-un folder din /content/.
 * Include frontmatter + conținutul brut.
 */
export function getAllMdx(folder) {
  const dir = path.join(contentDir, folder);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);
      return {
        frontmatter: data,
        content,
        slug: filename.replace(".mdx", ""),
      };
    });
}

/**
 * Returnează un singur fișier MDX după slug.
 * Aruncă eroare dacă nu există (pentru 404).
 */
export function getMdxBySlug(folder, slug) {
  const filePath = path.join(contentDir, folder, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  return { frontmatter: data, content, slug };
}

/**
 * Sortare după câmpul `ordine` din frontmatter.
 */
export function sortByOrdine(items) {
  return [...items].sort(
    (a, b) => (a.frontmatter.ordine || 99) - (b.frontmatter.ordine || 99)
  );
}

/**
 * Sortare după câmpul `data` din frontmatter (DESC).
 */
export function sortByData(items) {
  return [...items].sort(
    (a, b) =>
      new Date(b.frontmatter.data || 0) - new Date(a.frontmatter.data || 0)
  );
}

/**
 * Returnează toate slug-urile dintr-un folder (pt generateStaticParams).
 */
export function getAllSlugs(folder) {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

/* ═══════════════════════════════════════════════════════════════
   CUVINTE DUHOVNICEȘTI — helpers specifice
   ═══════════════════════════════════════════════════════════════ */

/** Categorii disponibile cu etichete de afișare */
export const CATEGORII_CUVINTE = {
  "vieti-de-sfinti": "Vieți de sfinți",
  "cuvinte-de-folos": "Cuvinte de folos",
  "marturii": "Mărturii",
  "praznice": "Praznice",
  "anunturi": "Anunțuri",
};

/**
 * Returnează articolele publicate (draft !== true), sortate desc.
 * Opțional filtrează după categorie.
 */
export function getPublishedCuvinte(categorie = null) {
  const all = getAllMdx("cuvinte").filter(
    (item) => item.frontmatter.draft !== true
  );

  const filtered = categorie
    ? all.filter((item) => item.frontmatter.categorie === categorie)
    : all;

  return sortByData(filtered);
}

/**
 * Paginare simplă: returnează { items, totalPages, currentPage }.
 */
export function paginateCuvinte(items, page = 1, perPage = 10) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
    currentPage,
  };
}
