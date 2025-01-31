"use server"

import { revalidatePath } from "next/cache"
import { Product } from "../models/product.model"
import { connectToDB } from "../mongoose"
import { scrapeAmazonProduct } from "../scraper"
import { ProductType } from "../types"

export async function scrapeAndStoreProduct(prodUrl: string) {
    if (!prodUrl) return

    try {
        connectToDB()
        const scrapedProduct = await scrapeAmazonProduct(prodUrl)
        console.log(scrapedProduct, ":scrapedProduct ")
        if (!scrapedProduct) return

        {/*
        // #TODO: 
        - Store this data in DB if its not already exist in DB.
        - update the products periodically in DB, using CRON job.
        - and if theres any price drop, we alert our users by sednding an email notification.
         */}

        const existingProduct = await Product.findOne({ url: scrapedProduct.url })

        if (existingProduct) {
            const updatedPriceHistory = [
                ...scrapedProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            const product: ProductType = {
                ...scrapedProduct, priceHistory: updatedPriceHistory,
                lowestPrice: Math.min(scrapedProduct.currentPrice, existingProduct.lowestPrice),
                highestPrice: Math.max(scrapedProduct.currentPrice, existingProduct.highestPrice),
                averagePrice: (scrapedProduct.currentPrice + existingProduct.averagePrice) / 2
            }
            const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url },
                product,
                { upsert: true, new: true }  // upsert means if the document doesn't exist, it will be created. new: true means return the updated document.
            )

            console.log(newProduct, "newProduct")


            // if we dont revalidate the path, nextjs wont be autmatically update it and we will 
            // stuck in loop.

            revalidatePath(`/products/${newProduct._id}`)
        }
        } catch (error: any) {
            throw new Error(`Failed to scrape and store product ${error.message}`)
        }
    }