import Link from "next/link";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import { DraftBadge } from "@/components/ui/DraftBanner";
import StructuredData, { buildBreadcrumbList } from "@/components/StructuredData";
import {
  getPublishedCuvinte,
  paginateCuvinte,
  CATEGORII_CUVINTE,
} from "@/lib/mdx";

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA
   ═══════════════════════════════════════════════════════════════ */

export const metadata = {
  title: "Cuvinte duhovnicești și anunțuri",
  description:
    "Vieți de sfinți, mărturii, cuvinte de folos și anunțuri de la Mănăstirea Sfinților Dionisie Exiguul și Efrem cel Nou din Târgușor.",
  alternates: {
    types: {
      "application/rss+xml": "/noutati/rss.xml",
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   HELPER — formatare dată în română
   ═══════════════════════════════════════════════════════════════ */

const LUNI_RO = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

function formatDataRo(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${LUNI_RO[d.getMonth()]} ${d.getFullYear()}`;
}

/* ═══════════════════════════════════════════════════════════════
   PAGINA INDEX
   ═══════════════════════════════════════════════════════════════ */

export default async function NoutatiPage({ searchParams }) {
  const sp = await searchParams;
  const categorieActiva = sp?.categorie || null;
  const pageNum = parseInt(sp?.pagina || "1", 10);

  const allArticles = getPublishedCuvinte(categorieActiva);
  const { items, totalPages, currentPage } = paginateCuvinte(
    allArticles,
    pageNum,
    10
  );

  return (
    <>
      <StructuredData
        data={buildBreadcrumbList([
          { name: "Acasă", url: "/" },
          { name: "Cuvinte" },
        ])}
      />
      {/* ─────────────────────────────────────────────────────────
          TITLU
          ───────────────────────────────────────────────────────── */}
      <section id="noutati-hero" className="py-12 md:py-16">
        <div className="container-page max-w-[65ch]">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-3">
            Din viața mănăstirii
          </p>
          <h1>Cuvinte duhovnicești și anunțuri</h1>
        </div>
      </section>

      <CrossSeparator />

      {/* ─────────────────────────────────────────────────────────
          FILTRU CATEGORII
          ───────────────────────────────────────────────────────── */}
      <section id="noutati-filtru" className="pb-8 md:pb-10">
        <div className="container-page max-w-[65ch]">
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Filtrare după categorie"
          >
            <CategoryLink
              href="/noutati"
              label="Toate"
              active={!categorieActiva}
            />
            {Object.entries(CATEGORII_CUVINTE).map(([key, label]) => (
              <CategoryLink
                key={key}
                href={`/noutati?categorie=${key}`}
                label={label}
                active={categorieActiva === key}
              />
            ))}
          </nav>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          LISTA ARTICOLE
          ───────────────────────────────────────────────────────── */}
      <section id="noutati-lista" className="pb-8 md:pb-12">
        <div className="container-page max-w-[65ch]">
          {items.length === 0 ? (
            <p className="text-text-muted text-[0.9375rem] py-8">
              Nu sunt articole în această categorie.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {items.map(({ frontmatter, slug }) => (
                <li key={slug} className="py-6 first:pt-0 last:pb-0">
                  {/* Data */}
                  <time
                    dateTime={frontmatter.data}
                    className="block text-[0.75rem] font-body font-500 text-text-muted mb-1.5"
                  >
                    {formatDataRo(frontmatter.data)}
                  </time>

                  {/* Titlu */}
                  <Link
                    href={`/noutati/${slug}`}
                    className="block group"
                  >
                    <h2 className="text-[1.25rem] md:text-[1.5rem] font-heading font-500 text-text group-hover:text-grena transition-colors duration-200 leading-snug mb-2">
                      {frontmatter.titlu}
                    </h2>
                  </Link>

                  {/* Descriere */}
                  {frontmatter.descriere && (
                    <p className="text-[0.875rem] text-text-secondary leading-relaxed line-clamp-2 max-w-none mb-2">
                      {frontmatter.descriere}
                    </p>
                  )}

                  {/* Categorie + Draft badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    {frontmatter.categorie && (
                      <Link
                        href={`/noutati?categorie=${frontmatter.categorie}`}
                        className="inline-block text-[0.6875rem] font-body font-500 uppercase tracking-[0.08em] text-olive bg-secondary px-2 py-0.5 rounded-[3px] border border-border hover:border-border-hover transition-colors"
                      >
                        {CATEGORII_CUVINTE[frontmatter.categorie] ||
                          frontmatter.categorie}
                      </Link>
                    )}
                    {frontmatter.draft !== false && <DraftBadge />}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          PAGINARE
          ───────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <>
          <CrossSeparator />
          <section id="noutati-paginare" className="pb-10 md:pb-14">
            <div className="container-page max-w-[65ch]">
              <nav
                className="flex items-center justify-center gap-2 text-[0.875rem] font-body"
                aria-label="Paginare"
              >
                {/* Anterior */}
                {currentPage > 1 ? (
                  <Link
                    href={buildPageUrl(categorieActiva, currentPage - 1)}
                    className="px-3 py-1.5 text-olive hover:text-text transition-colors"
                  >
                    {"‹ Anterior"}
                  </Link>
                ) : (
                  <span className="px-3 py-1.5 text-text-muted/40 cursor-default">
                    {"‹ Anterior"}
                  </span>
                )}

                {/* Numere */}
                <span className="text-text-muted mx-1">·</span>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <Link
                      key={num}
                      href={buildPageUrl(categorieActiva, num)}
                      className={`px-2.5 py-1 rounded-[3px] transition-colors ${
                        num === currentPage
                          ? "text-text font-500 bg-secondary border border-border"
                          : "text-text-muted hover:text-text"
                      }`}
                      aria-current={
                        num === currentPage ? "page" : undefined
                      }
                    >
                      {num}
                    </Link>
                  )
                )}
                <span className="text-text-muted mx-1">·</span>

                {/* Următor */}
                {currentPage < totalPages ? (
                  <Link
                    href={buildPageUrl(categorieActiva, currentPage + 1)}
                    className="px-3 py-1.5 text-olive hover:text-text transition-colors"
                  >
                    {"Următor ›"}
                  </Link>
                ) : (
                  <span className="px-3 py-1.5 text-text-muted/40 cursor-default">
                    {"Următor ›"}
                  </span>
                )}
              </nav>
            </div>
          </section>
        </>
      )}
    </>
  );
}

/* ─── Componente locale ─── */

function CategoryLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`
        inline-block text-[0.8125rem] font-body font-500
        px-3 py-1.5 rounded-[3px] border
        transition-colors duration-200
        ${
          active
            ? "text-text bg-secondary border-border-hover"
            : "text-text-muted border-border hover:text-text hover:border-border-hover"
        }
      `}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function buildPageUrl(categorie, page) {
  const params = new URLSearchParams();
  if (categorie) params.set("categorie", categorie);
  if (page > 1) params.set("pagina", String(page));
  const qs = params.toString();
  return `/noutati${qs ? `?${qs}` : ""}`;
}
