import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Layout public — Header + main + Footer.
 * Se aplică la toate paginile din route group (public).
 */
export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-[var(--header-height)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
