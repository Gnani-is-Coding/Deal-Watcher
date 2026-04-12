import { getSimilarProducts } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const similar = await getSimilarProducts(id);
  return NextResponse.json({ success: true, data: similar ?? [] });
}
