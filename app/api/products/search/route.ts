import { searchProducts } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";

  if (q.trim().length < 2) {
    return NextResponse.json({ success: true, data: [] });
  }

  const results = await searchProducts(q);
  return NextResponse.json({ success: true, data: results });
}
