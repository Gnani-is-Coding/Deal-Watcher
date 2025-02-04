"use server"

import { revalidatePath } from "next/cache"
import { Product } from "../models/product.model"
import { connectToDB } from "../mongoose"
import { scrapeAmazonProduct } from "../scraper"
import { ProductType, User } from "../types"
import { generateEmailBody, sendEmail } from "../Nodemailer"


{/* The presence of _id: ObjectId(), _v: keys in response frmo mongoose, are raising an issue 
    MAKE SURE WE SEND ONLY PURE JSON STRINGIFIRED OBJECTS ONLY AS RESPONSE.
    */}
export async function scrapeAndStoreProduct(prodUrl: string) {
    if (!prodUrl) return

    try {
        connectToDB()
        const scrapedProduct = await scrapeAmazonProduct(prodUrl)
        if (!scrapedProduct) return

        let product:ProductType = scrapedProduct

        {/*
        // #TODO: 
        - Store this data in DB if its not already exist in DB.
        - update the products periodically in DB, using CRON job.
        - and if theres any price drop, we alert our users by sednding an email notification.
         */}

        const existingProduct = await Product.findOne({ url: scrapedProduct.url })
        if (existingProduct) {
            const updatedPriceHistory = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            product = {
                ...scrapedProduct, priceHistory: updatedPriceHistory,
                lowestPrice: Math.min(scrapedProduct.currentPrice, existingProduct.lowestPrice),
                highestPrice: Math.max(scrapedProduct.currentPrice, existingProduct.highestPrice),
                averagePrice: (scrapedProduct.currentPrice + existingProduct.averagePrice) / 2
            }
        }

        const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url },
            product,
            { upsert: true, new: true }  // upsert means if the document doesn't exist, it will be created. new: true means return the updated document.
        )

            // if we dont revalidate the path, nextjs wont be autmatically update it and we will 
            // stuck in loop.

        revalidatePath(`/products/${newProduct._id}`)
        
        } catch (error: any) {
            throw new Error(`Failed to scrape and store product ${error.message}`)
        }
}

export async function getProductById(productID: string) {
    try {
        connectToDB()

        const products = await Product.findOne({_id: productID})
        if (!productID) return null

        return JSON.parse(JSON.stringify(products))

    }
    catch (error: any) {
        throw new Error(`Failed fetch product by Id ${error.message}`)
    }    
}

export async function getAllProducts() {
    try {
        connectToDB()
        const allProducts = await Product.find().lean()

        if (!allProducts) return null

        return JSON.parse(JSON.stringify(allProducts))
    } catch(e: any) {
        console.log(`Error while getting all products: ${e.message}`)
    }
}

export async function getSimilarProducts(prodId: string) {
    try {
        connectToDB()
        const currentProduct = await Product.find({_id: prodId})

        if (!currentProduct) return null
        const similarProduct = await Product.find({
             _id: {$ne: prodId},
        }).limit(3).lean() 

        return JSON.parse(JSON.stringify(similarProduct))
    } catch(e: any) {
        console.log(`Error while getting similar products: ${e.message}`)
    }
}

export async function addUserEmailToProduct(prodId: string, emailId: string){
    try {
        const product = await Product.findById(prodId)

        if (!product) return console.log("Product not found")

        const existingUser = product.users?.some((user: User) => user.email === emailId)
        console.log(existingUser, "existingUser")

        if (!existingUser) {
            product.users?.push({email: emailId})

            await product.save()

            const emailContent = await generateEmailBody(product, "WELCOME")

            await sendEmail(emailContent, [emailId])
        }
        else {
        console.log("User already exist")
        }

    } catch(e:any) {
        console.log("Error while adding email to products",e.message)
    }
}