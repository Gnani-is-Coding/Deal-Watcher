import { Notification } from "../Nodemailer";


export interface PriceHistory {
    price: number
    date?: Date
}
export type ProductType = {
    _id?: string;
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
    averagePrice: number,
    image: string,
    users?: []
}

export type NotificationsType = keyof typeof Notification

export type User = {
    email: string
}

export type EmailContent = {
    subject: string;
    body: string;
};

export type EmailProductInfo = {
    title: string;
    url: string;
};

