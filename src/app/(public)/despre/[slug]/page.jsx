import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import { getMdxBySlug, getAllSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MdxComponents";

export async function generateStaticParams() {
  return getAllSlugs("despre").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getMdxBySlug("despre", slug);
  if (!item) return {};

  const { frontmatter } = item;
  return {
    title: frontmatter.titlu,
    description: frontmatter.descriere,
    openGraph: {
      title: frontmatter.titlu,
      description: frontmatter.descriere,
      type: "article",
    },
  };
}

export default async function DesprePage({ params }) {
  const { slug } = await params;
  const item = getMdxBySlug("despre", slug);
  if (!item) notFound();

  const { frontmatter, content } = item;

  // Link complementar: Macaria ↔ Sf. Efrem moaște
  const relatedLinks = getRelatedLinks(slug);

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <section className="py-12 md:py-20">
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
              href="/despre"
              className="text-olive hover:text-text transition-colors"
            >
              Despre
            </Link>
            <span className="mx-2">›</span>
            <span>{frontmatter.titlu}</span>
          </nav>

          <h1>{frontmatter.titlu}</h1>

          {frontmatter.subtitlu && (
            <p className="mt-2 text-[1.0625rem] text-scripture text-text-secondary font-heading font-400 max-w-none">
              {frontmatter.subtitlu}
            </p>
          )}

          {/* Metadata badges */}
          <div className="flex flex-wrap gap-3 mt-5">
            {frontmatter.praznuire && (
              <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-body font-500 text-olive bg-secondary px-2.5 py-1 rounded-[3px] border border-border">
                <Cross size={10} className="text-gold" />
                Prăznuire: {frontmatter.praznuire}
              </span>
            )}
            {frontmatter.perioada && (
              <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-body font-500 text-text-muted bg-secondary px-2.5 py-1 rounded-[3px] border border-border">
                {frontmatter.perioada}
              </span>
            )}
            {frontmatter.data_nasterii && frontmatter.data_adormirii && (
              <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-body font-500 text-text-muted bg-secondary px-2.5 py-1 rounded-[3px] border border-border">
                {frontmatter.data_nasterii} — {frontmatter.data_adormirii}
              </span>
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

      {/* ═══ LINKURI CONEXE ═══ */}
      {relatedLinks.length > 0 && (
        <>
          <CrossSeparator />
          <section className="py-8 md:py-12">
            <div className="container-page max-w-[65ch]">
              <h2 className="text-lg font-heading font-600 text-text mb-6">
                Continuă lectura
              </h2>
              <div className="space-y-3">
                {relatedLinks.map(({ href, title, subtitle }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-4 rounded-[4px] border border-border hover:bg-secondary transition-colors group"
                  >
                    <Cross size={12} className="text-gold shrink-0" />
                    <div>
                      <span className="text-[0.9375rem] font-heading font-500 text-text group-hover:text-grena transition-colors">
                        {title}
                      </span>
                      <span className="block text-[0.8125rem] font-body text-text-muted">
                        {subtitle}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

/* ─── Linkuri recurente per pagină ─── */

function getRelatedLinks(slug) {
  switch (slug) {
    case "cuvioasa-macaria":
      return [
        {
          href: "/sfinte-moaste/sf-efrem-cel-nou",
          title: "Sfântul Efrem cel Nou",
          subtitle: "Moaștele descoperite de Cuvioasa Macaria în 1950",
        },
        {
          href: "/despre/sf-dionisie-exiguul",
          title: "Sfântul Dionisie Exiguul",
          subtitle: "Celălalt ocrotitor al mănăstirii din Târgușor",
        },
      ];
    case "sf-dionisie-exiguul":
      return [
        {
          href: "/sfinte-moaste/sf-efrem-cel-nou",
          title: "Sfântul Efrem cel Nou",
          subtitle: "Celălalt ocrotitor al mănăstirii din Târgușor",
        },
        {
          href: "/despre/cuvioasa-macaria",
          title: "Cuvioasa Macaria de la Nea Makri",
          subtitle: "Cea care a descoperit moaștele Sf. Efrem",
        },
      ];
    default:
      return [];
  }
}
