import { Product } from "@/lib/models/product.model"
import { connectToDB } from "@/lib/mongoose"
import { generateEmailBody, sendEmail } from "@/lib/Nodemailer"
import { scrapeAmazonProduct } from "@/lib/scraper"
import { ProductType } from "@/lib/types"
import { getEmailNotificationType } from "@/lib/utils"
import { NextResponse } from "next/server"

{/*
- This will scrap tha products, and will periodically update the same in DB.

*/}

// 1. SCRAP ALL THE PRODUCTS & UPDATE IN DB
// 2. RUN A CRON JOB TO UPDATE THE PRODUCTS PERIODICALLY

export async function GET() {
    try {
        connectToDB()
        const products = await Product.find()
        if (!products) {
            throw new Error("No products found")
        }

        // ##################1;
        const updatedProducts = await Promise.all(
            products.map(async (currentProduct) => {
                const scrapedProduct = await scrapeAmazonProduct(currentProduct.url) //
 
                if (!scrapedProduct) throw new Error("Product not found")
                
                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                    { price: scrapedProduct.currentPrice }
                ]
        
                const updatedProduct: ProductType = {
                    ...scrapedProduct, priceHistory: updatedPriceHistory,
                    lowestPrice: Math.min(scrapedProduct.currentPrice, currentProduct.lowestPrice),
                    highestPrice: Math.max(scrapedProduct.currentPrice, currentProduct.highestPrice),
                    averagePrice: (scrapedProduct.currentPrice + currentProduct.averagePrice) / 2
                }
                const newProduct = await Product.findOneAndUpdate({ url: currentProduct.url },
                    updatedProduct,
                )

                //################ 2 . Check Each product status, like Price lowered, stock is available etc and send mails.
                const emailNotificationType = getEmailNotificationType(scrapedProduct, currentProduct)

                if (emailNotificationType && newProduct.users.length > 0){
                    const productInfo = {
                        title: newProduct.title,
                        url: newProduct.url,
                    }
                    const emailContent = await generateEmailBody(productInfo, "LOWEST_PRICE")

                    const userEmailIds: string[] = newProduct.users.map((user: any) => user.email)
                    console.log({title: newProduct.title, mailIds: userEmailIds}, "mailIds %%%%%%%%%%%%%%%%%%")

                    await sendEmail(emailContent, userEmailIds)
                }
                return updatedProduct
            })
        )
    
        
        return NextResponse.json({
            message: 'ok',
            data: updatedProducts
        })

    } catch (error: any) {
        throw new Error(`No products found, while performing CRON JOB :- ${error.message}`)
    }
}