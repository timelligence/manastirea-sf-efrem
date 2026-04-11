import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import StructuredData, {
  buildArticle,
  buildBreadcrumbList,
} from "@/components/StructuredData";
import {
  getMdxBySlug,
  getAllSlugs,
  getPublishedCuvinte,
  CATEGORII_CUVINTE,
} from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MdxComponents";

/* ═══════════════════════════════════════════════════════════════
   STATIC PARAMS
   ═══════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  return getAllSlugs("cuvinte").map((slug) => ({ slug }));
}

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA + JSON-LD
   ═══════════════════════════════════════════════════════════════ */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getMdxBySlug("cuvinte", slug);
  if (!item) return {};

  const { frontmatter } = item;
  return {
    title: frontmatter.titlu,
    description: frontmatter.descriere,
    openGraph: {
      title: frontmatter.titlu,
      description: frontmatter.descriere,
      type: "article",
      publishedTime: frontmatter.data,
      ...(frontmatter.imagine && { images: [frontmatter.imagine] }),
    },
    alternates: {
      types: {
        "application/rss+xml": "/noutati/rss.xml",
      },
    },
  };
}

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
   PAGINA ARTICOL
   ═══════════════════════════════════════════════════════════════ */

export default async function CuvantPage({ params }) {
  const { slug } = await params;
  const item = getMdxBySlug("cuvinte", slug);
  if (!item) notFound();

  const { frontmatter, content } = item;

  // Articole similare din aceeași categorie (max 3)
  const related = getPublishedCuvinte(frontmatter.categorie)
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* JSON-LD: Article + BreadcrumbList */}
      <StructuredData
        data={buildArticle({
          title: frontmatter.titlu,
          date: frontmatter.data,
          description: frontmatter.descriere,
          image: frontmatter.imagine,
          url: `/noutati/${slug}`,
        })}
      />
      <StructuredData
        data={buildBreadcrumbList([
          { name: "Acasă", url: "/" },
          { name: "Cuvinte", url: "/noutati" },
          { name: frontmatter.titlu },
        ])}
      />

      {/* ═══ HEADER ═══ */}
      <section className="py-12 md:py-16">
        <div className="container-page max-w-[65ch]">
          {/* Breadcrumb */}
          <nav className="mb-6 text-[0.8125rem] font-body text-text-muted">
            <Link
              href="/"
              className="text-olive hover:text-text transition-colors"
            >
              Acasă
            </Link>
            <span className="mx-2">›</span>
            <Link
              href="/noutati"
              className="text-olive hover:text-text transition-colors"
            >
              Cuvinte
            </Link>
            <span className="mx-2">›</span>
            <span>{frontmatter.titlu}</span>
          </nav>

          {/* Categorie */}
          {frontmatter.categorie && (
            <Link
              href={`/noutati?categorie=${frontmatter.categorie}`}
              className="inline-block text-[0.6875rem] font-body font-500 uppercase tracking-[0.1em] text-olive bg-secondary px-2 py-0.5 rounded-[3px] border border-border hover:border-border-hover transition-colors mb-4"
            >
              {CATEGORII_CUVINTE[frontmatter.categorie] ||
                frontmatter.categorie}
            </Link>
          )}

          {/* Titlu */}
          <h1>{frontmatter.titlu}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-[0.8125rem] font-body text-text-muted">
            <time dateTime={frontmatter.data}>
              {formatDataRo(frontmatter.data)}
            </time>
            {frontmatter.autor && (
              <>
                <span className="text-border">·</span>
                <span>{frontmatter.autor}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ CONȚINUT MDX ═══ */}
      <section className="py-8 md:py-10">
        <div className="container-page max-w-[65ch]">
          <article className="prose-monastery">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </div>
      </section>

      {/* ═══ ARTICOLE ASEMĂNĂTOARE ═══ */}
      {related.length > 0 && (
        <>
          <CrossSeparator />
          <section className="py-8 md:py-12">
            <div className="container-page max-w-[65ch]">
              <h2 className="text-lg font-heading font-600 text-text mb-6">
                Articole asemănătoare
              </h2>
              <div className="space-y-3">
                {related.map(({ frontmatter: fm, slug: s }) => (
                  <Link
                    key={s}
                    href={`/noutati/${s}`}
                    className="flex items-start gap-3 p-4 rounded-[4px] border border-border hover:bg-secondary transition-colors group"
                  >
                    <Cross
                      size={12}
                      className="text-gold shrink-0 mt-1"
                    />
                    <div>
                      <span className="text-[0.9375rem] font-heading font-500 text-text group-hover:text-grena transition-colors leading-snug">
                        {fm.titlu}
                      </span>
                      <span className="block text-[0.75rem] font-body text-text-muted mt-0.5">
                        {formatDataRo(fm.data)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══ FOOTER ARTICOL ═══ */}
      <CrossSeparator />
      <section className="pb-10 md:pb-14">
        <div className="container-page max-w-[65ch] text-center">
          <Link
            href="/noutati"
            className="text-[0.9375rem] font-body font-500 text-olive hover:text-text transition-colors duration-200"
          >
            {"\u2190 Înapoi la toate cuvintele"}
          </Link>
        </div>
      </section>
    </>
  );
}
