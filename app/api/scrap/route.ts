import { scrapeAmazonProduct } from "@/lib/scraper";
import { NextResponse } from "next/server";

async function POST(req: Request) {
  try {
    const { url } = req.body;

    const scrapedProduct = await scrapeAmazonProduct(url);

    return NextResponse.json({message: 'ok', data: scrapedProduct});
  } catch (err: any) {
    return NextResponse.json({message: 'Error occurred', data: null}, {status: 500});
  }
}
