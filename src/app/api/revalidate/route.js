import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * POST /api/revalidate?path=/program-slujbe
 * Apelat din admin după save/delete pentru a invalida cache-ul ISR.
 */
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { error: "Parametrul 'path' lipsește." },
      { status: 400 }
    );
  }

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, path });
}
