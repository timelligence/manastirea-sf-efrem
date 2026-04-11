import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Cross from "@/components/ui/Cross";
import { CrossSeparator } from "@/components/ui/Cross";
import { getMdxBySlug, getAllSlugs, getAllMdx, sortByOrdine } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import StructuredData, { buildBreadcrumbList } from "@/components/StructuredData";

export async function generateStaticParams() {
  return getAllSlugs("moaste").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getMdxBySlug("moaste", slug);
  if (!item) return {};

  const { frontmatter } = item;
  return {
    title: frontmatter.nume,
    description: frontmatter.descriere_scurta,
    openGraph: {
      title: frontmatter.nume,
      description: frontmatter.descriere_scurta,
      type: "article",
    },
  };
}

export default async function MoastePage({ params }) {
  const { slug } = await params;
  const item = getMdxBySlug("moaste", slug);
  if (!item) notFound();

  const { frontmatter, content } = item;
  const isIcon = frontmatter.tip === "icoana";

  // Alte moaște pentru navigarea laterală
  const allItems = sortByOrdine(getAllMdx("moaste")).filter(
    (m) => m.slug !== slug
  );

  return (
    <>
      <StructuredData
        data={buildBreadcrumbList([
          { name: "Acasă", url: "/" },
          { name: "Sfinte Moaște", url: "/sfinte-moaste" },
          { name: frontmatter.nume },
        ])}
      />
      {/* ═══ HEADER ═══ */}
      <section className="py-12 md:py-16">
        <div className="container-page max-w-[65ch]">
          {/* Breadcrumb */}
          <nav className="mb-6 text-[0.8125rem] font-body text-text-muted">
            <Link
              href="/sfinte-moaste"
              className="text-olive hover:text-text transition-colors"
            >
              Sfinte Moaște
            </Link>
            <span className="mx-2">›</span>
            <span>{frontmatter.nume}</span>
          </nav>

          {/* Badge */}
          <span className="inline-block text-[0.6875rem] font-body font-500 uppercase tracking-[0.1em] text-olive bg-secondary px-2 py-0.5 rounded-[3px] border border-border mb-4">
            {isIcon ? "Icoană" : "Moaște"} · Prăznuire: {frontmatter.praznuire}
          </span>

          <h1>{frontmatter.nume}</h1>

          <p className="mt-3 text-text-secondary text-[1rem] max-w-none">
            {frontmatter.descriere_scurta}
          </p>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ AJUTOR PENTRU ═══ */}
      {frontmatter.ajutor_pentru && frontmatter.ajutor_pentru.length > 0 && (
        <section className="py-8 md:py-10">
          <div className="container-page max-w-[65ch]">
            <div className="p-5 md:p-6 bg-secondary rounded-[4px] border border-border">
              <h2 className="text-base font-heading font-600 text-grena mb-4">
                {isIcon
                  ? "Credincioșii se roagă pentru:"
                  : "Grabnic ajutător pentru:"}
              </h2>
              <ul className="space-y-2">
                {frontmatter.ajutor_pentru.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 items-start text-[0.9375rem] text-text-secondary"
                  >
                    <Cross
                      size={10}
                      className="text-gold shrink-0 mt-1.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CONȚINUT MDX ═══ */}
      <section className="py-8 md:py-10">
        <div className="container-page max-w-[65ch]">
          <article className="prose-monastery">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </div>
      </section>

      <CrossSeparator />

      {/* ═══ ALTE MOAȘTE ═══ */}
      <section className="py-8 md:py-12">
        <div className="container-page max-w-[65ch]">
          <h2 className="text-lg font-heading font-600 text-text mb-6">
            Alte comori ale mănăstirii
          </h2>
          <div className="space-y-3">
            {allItems.map(({ frontmatter: fm, slug: s }) => (
              <Link
                key={s}
                href={`/sfinte-moaste/${s}`}
                className="flex items-center gap-3 p-3 rounded-[4px] border border-border hover:bg-secondary transition-colors group"
              >
                <Cross size={12} className="text-gold shrink-0" />
                <div>
                  <span className="text-[0.9375rem] font-heading font-500 text-text group-hover:text-grena transition-colors">
                    {fm.nume}
                  </span>
                  <span className="block text-[0.75rem] font-body text-text-muted">
                    {fm.praznuire}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
