import AdminShell from "./_components/AdminShell";

/**
 * Layout admin — forțează rendering dinamic (nu prerender la build).
 * Admin-ul nu funcționează fără Supabase oricum.
 */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — Mănăstirea Sf. Efrem",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
