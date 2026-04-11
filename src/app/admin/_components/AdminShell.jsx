"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { label: "Program slujbe", href: "/admin/program" },
  { label: "Praznice", href: "/admin/praznice" },
];

/**
 * Shell client pentru admin — bară sus cu navigație și logout.
 */
export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Nu afișa chrome-ul pe pagina de login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Bara admin */}
      <header className="bg-text text-primary px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/admin/program"
            className="font-heading text-[0.875rem] font-500 text-primary/80"
          >
            Admin Mănăstire
          </Link>
          <nav className="flex gap-1">
            {NAV.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1 text-[0.8125rem] font-body rounded transition-colors ${
                  pathname.startsWith(href)
                    ? "bg-primary/15 text-primary"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-[0.75rem] font-body text-primary/50 hover:text-primary/80 transition-colors"
          >
            {"Site public \u2192"}
          </Link>
          <button
            onClick={handleLogout}
            className="text-[0.75rem] font-body text-primary/60 hover:text-primary border border-primary/20 px-3 py-1 rounded transition-colors"
          >
            Deconectare
          </button>
        </div>
      </header>

      {/* Conținut */}
      <div className="max-w-4xl mx-auto px-5 py-8">{children}</div>
    </div>
  );
}
