import { getAllProducts } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json({ success: true, data: products });
}
