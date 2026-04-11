import { redirect } from "next/navigation";

// /admin → redirect la /admin/program
export default function AdminIndexPage() {
  redirect("/admin/program");
}
