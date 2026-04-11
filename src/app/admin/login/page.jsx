"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Date de autentificare incorecte.");
      setLoading(false);
      return;
    }

    router.push("/admin/program");
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-xl mb-2">Administrare</h1>
        <p className="text-center text-text-muted text-[0.8125rem] mb-8">
          Mănăstirea Sf. Dionisie & Sf. Efrem
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-[0.8125rem] font-body font-500 text-text-secondary mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[4px] bg-secondary text-text text-[0.9375rem] font-body focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[0.8125rem] font-body font-500 text-text-secondary mb-1"
            >
              Parolă
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[4px] bg-secondary text-text text-[0.9375rem] font-body focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          {error && (
            <p className="text-grena text-[0.8125rem]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-text text-primary text-[0.875rem] font-body font-500 rounded-[4px] hover:bg-text/90 disabled:opacity-50 transition-colors"
          >
            {loading ? "Se conectează..." : "Conectare"}
          </button>
        </form>
      </div>
    </div>
  );
}
