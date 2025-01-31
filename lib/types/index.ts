

interface PriceHistory  {
    price: number
    date?: Date
}
export type ProductType = {
    url: string,
    title: string,
    originalPrice: number
    currentPrice: number,
    discountRate: number,
    currency: string,
    isOutOfStock: boolean,
    rating: number,
    reviewsCount: number,
    category: string,
    description: string,
    priceHistory: PriceHistory[],
    lowestPrice: number,
    highestPrice: number,
    averagePrice: number
}