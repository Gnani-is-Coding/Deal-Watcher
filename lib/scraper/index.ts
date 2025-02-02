import axios from "axios"
import * as cheerio from 'cheerio' 
import { extractPrices } from "../utils"


export async function scrapeAmazonProduct(url:string) {
    if (!url) return

    //BRIGHTDATA CONFIGARAITON
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 33335
    const session_id = (Math.floor(1000000 * Math.random())) | 0
    const options = {
        auth: {
            username: `{${username}-session-${session_id}}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejecUnauthorized: false,
    }

    try {
        const response = await axios.get(url, options)
        const $ = cheerio.load(response.data)

        const title = $('#productTitle').text().trim()
        const currentPrice = extractPrices(
            $('span.reinventPricePriceToPayMargin span.a-price-whole'),
            $('span.a-price-whole'),
            $('.a-price .aok-align-center span.a-offscreen')
        )
        const originalPrice = extractPrices(
            $('span.a-price.a-text-price > span.a-offscreen')
        ) 
        const outofStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable'

        const images = $('#imgTagWrapperId').attr('data-a-dynamic-image') ||
        $('#landingImage').attr('data-a-dynamic-image') || '{}'
        const imageUrls = Object.keys(JSON.parse(images))

        const currency = $('span.a-price-symbol').text().trim().slice(0,1) ?? ''
        const discountRate = $('span.reinventPriceSavingsPercentageMargin').text().replace(/[-%]/g, '')

        const description = $('#productDescription').text().trim()
        const data = {
            url: imageUrls[0],
            title,
            originalPrice: Number(originalPrice) || Number(currentPrice),
            currentPrice: Number(currentPrice) || Number(originalPrice),
            discountRate: Number(discountRate),
            currency: currency ?? '$',
            isOutOfStock: outofStock,
            rating: 4.5,
            reviewsCount: 100,
            category: 'category',
            description,
            priceHistory: [],
            lowestPrice: Number(originalPrice) || Number(currentPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(originalPrice) || Number(currentPrice),
        }
        return data
    }catch(error: any) {
        throw new Error (`Failed to scrape product: ${error.message}`)
    }
    
}