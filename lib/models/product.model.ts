import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    url: {unique: true, type: String, required: true},
    currency: {type: String, required: true},
    image: {type: String, required: true},
    title: {type: String, required: true},
    originalPrice: {type: Number, required: true},
    currentPrice: {type: Number, required: true},
    discountRate: {type: Number, required: true},
    isOutOfStock: {type: Boolean, default: false},
    rating: {type: Number, required: true},
    reviewsCount: {type: Number, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    priceHistory: [
        {
            price: {type: Number, required: true},
            date: {type: Date, default: Date.now}
        }
    ],
    lowestPrice: {type: Number, required: true},
    highestPrice: {type: Number, required: true},
    averagePrice: {type: Number, required: true},
    users: [
        {email: {type: String, required: true},}
    ], default: [],    // how many users have serached for this product.
}, {timestamps: true})


export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)