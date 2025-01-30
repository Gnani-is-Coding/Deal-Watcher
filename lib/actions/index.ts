"use server"

import { scrapeAmazonProduct } from "../scraper"

export async  function scrapeAndStoreProduct(prodUrl: string){
    if (!prodUrl) return

    try {
        const scraperProduct = await scrapeAmazonProduct(prodUrl)
        if (!scraperProduct) return 

        {/*
        // #TODO: 
        - Store this data in DB || Find product in the DB.
        - update the products periodically in DB, using CRON job.
        - and if theres any price drop, we aler our users by sednding an email notification.

         */}
    } catch (error: any) {
        throw new Error(`Failed to scrape and store product ${error.message}`)
    }
}