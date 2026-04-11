import Link from "next/link";
import Cross from "@/components/ui/Cross";

/**
 * Componente custom pentru renderizarea MDX în design system-ul mănăstirii.
 * Se pasează la <MDXRemote components={mdxComponents} />.
 */
export const mdxComponents = {
  h1: (props) => <h1 {...props} />,

  h2: (props) => (
    <h2
      className="mt-10 mb-4 text-xl md:text-2xl font-heading font-600 text-text"
      {...props}
    />
  ),

  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-lg font-heading font-600 text-text"
      {...props}
    />
  ),

  p: (props) => (
    <p
      className="mb-4 text-text-secondary text-[0.9375rem] leading-relaxed max-w-none"
      {...props}
    />
  ),

  ul: (props) => <ul className="mb-5 space-y-2 pl-0 list-none" {...props} />,

  ol: (props) => (
    <ol className="mb-5 space-y-2 pl-5 list-decimal text-text-secondary text-[0.9375rem]" {...props} />
  ),

  li: (props) => (
    <li className="flex gap-2 items-start text-text-secondary text-[0.9375rem]">
      <Cross size={10} className="text-gold shrink-0 mt-2" />
      <span {...props} />
    </li>
  ),

  blockquote: (props) => (
    <blockquote
      className="my-6 pl-5 border-l-2 border-gold/40 text-scripture text-[1rem] text-text-secondary max-w-none"
      {...props}
    />
  ),

  a: ({ href, children, ...props }) => {
    const isInternal = href?.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-olive font-500 underline underline-offset-2 decoration-olive/30 hover:decoration-olive transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-olive font-500 underline underline-offset-2 decoration-olive/30 hover:decoration-olive transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },

  strong: (props) => (
    <strong className="font-500 text-text" {...props} />
  ),

  em: (props) => <em className="text-scripture" {...props} />,

  hr: () => (
    <div className="my-8 flex items-center justify-center gap-4">
      <div className="flex-1 h-px bg-border" />
      <Cross size={12} className="text-gold" />
      <div className="flex-1 h-px bg-border" />
    </div>
  ),
};
