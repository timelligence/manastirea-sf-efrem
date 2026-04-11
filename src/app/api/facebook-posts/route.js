/**
 * Facebook posts API route.
 *
 * TODO: Discută cu mănăstirea care abordare preferă:
 * 1. Automated fetch via Facebook Graph API (necesită app review + token)
 * 2. Manual update săptămânal via /content/facebook.json
 *
 * Momentan returnează date din fișierul local facebook.json.
 * Dacă fișierul nu există, returnează un array gol.
 *
 * Când se decide abordarea 1, implementează:
 * - FACEBOOK_PAGE_ID + FACEBOOK_ACCESS_TOKEN în .env
 * - fetch(`https://graph.facebook.com/v19.0/${pageId}/posts?fields=...`)
 * - next: { revalidate: 86400 } pentru cache 24h
 */

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24h ISR

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "content", "facebook.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const posts = JSON.parse(raw);

    return NextResponse.json(posts.slice(0, 5));
  } catch {
    return NextResponse.json([]);
  }
}
