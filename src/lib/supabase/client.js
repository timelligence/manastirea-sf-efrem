"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase pentru componente client (admin CRUD).
 * Folosește anon key + cookie session.
 * Returnează null dacă env vars nu sunt setate (dev mode fără Supabase).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createBrowserClient(url, key);
}
