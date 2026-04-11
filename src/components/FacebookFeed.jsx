import Link from "next/link";
import Cross from "@/components/ui/Cross";
import Card from "@/components/ui/Card";

/**
 * FacebookFeed — afișează ultimele postări de pe Facebook.
 *
 * TODO: Discută cu mănăstirea care abordare preferă:
 * 1. Automated fetch (server-side, cu cache 24h) — necesită Facebook App
 * 2. Manual update săptămânal — fișier /content/facebook.json editat de voluntar
 *
 * Momentan funcționează cu fișierul local facebook.json (abordarea 2).
 * Dacă fișierul nu există sau e gol, se afișează fallback-ul static.
 */

/* ─── Date statice / fallback ─── */
const FALLBACK_POSTS = [
  {
    id: "1",
    text: "Praznicul Sfântului Mare Mucenic Efrem cel Nou — 5 mai. Vă așteptăm la hramul mănăstirii cu rugăciune, Sfânta Liturghie și privegherea din ajun.",
    date: "2026-05-01",
    url: "https://www.facebook.com/manastirea.sfefrem",
  },
  {
    id: "2",
    text: "Sfântul Cuvios Dionisie cel Smerit — 1 septembrie, începutul Indictionului bisericesc. Primul hram al mănăstirii noastre.",
    date: "2025-08-28",
    url: "https://www.facebook.com/manastirea.sfefrem",
  },
  {
    id: "3",
    text: "Paraclisul Maicii Domnului se săvârșește în fiecare duminică, de la ora 17:00. Vă așteptăm cu dragoste.",
    date: "2025-07-15",
    url: "https://www.facebook.com/manastirea.sfefrem",
  },
];

/* ─── Helpers ─── */

const LUNI_RO = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

function formatDateRo(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${LUNI_RO[d.getMonth()]} ${d.getFullYear()}`;
}

function truncateText(text, maxLen = 160) {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

/* ─── Componentă ─── */

export default function FacebookFeed({ posts }) {
  const items = posts && posts.length > 0 ? posts.slice(0, 3) : FALLBACK_POSTS;

  return (
    <section id="facebook-feed" className="py-8 md:py-12">
      <div className="container-page">
        <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive mb-2 text-center">
          Pe Facebook
        </p>
        <h2 className="text-center mb-8">Din viața mănăstirii</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map((post) => (
            <Card key={post.id} as="article" className="flex flex-col">
              <div className="flex-1">
                {/* Iconiță FB + dată */}
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-text-muted shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <time
                    dateTime={post.date}
                    className="text-[0.75rem] font-body text-text-muted"
                  >
                    {formatDateRo(post.date)}
                  </time>
                </div>

                {/* Text postare */}
                <p className="text-[0.875rem] text-text-secondary leading-relaxed max-w-none mb-4">
                  {truncateText(post.text)}
                </p>
              </div>

              {/* Link Facebook */}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.8125rem] font-body font-500 text-olive hover:text-text transition-colors duration-200"
              >
                {"Citește pe Facebook →"}
              </a>
            </Card>
          ))}
        </div>

        {/* Link general */}
        <div className="text-center mt-6">
          <a
            href="https://www.facebook.com/manastirea.sfefrem"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block px-5 py-2
              border border-text text-text text-[0.875rem] font-body font-500
              rounded-[4px]
              hover:bg-text hover:text-primary
              transition-colors duration-200
            "
          >
            {"Urmărește-ne pe Facebook →"}
          </a>
        </div>
      </div>
    </section>
  );
}
