import { addUserEmailToProduct } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const email: string = body.email ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }

  await addUserEmailToProduct(id, email);
  return NextResponse.json({ success: true });
}
