import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true) // to prevent unknow field queries.
    if (isConnected) console.log("Mongose connection already established")

    if (!process.env.MONGODB_URI) {
        console.log("MongoDb URI is not defined!!")
    }

    mongoose.connect(process.env.MONGODB_URI as string).then(() => { 
        isConnected = true
        console.log("Mongo-DB Connection Succesful")
    })
        .catch((err) =>
            console.log(`Error while connecting to MongoDB: ${err.message}`))
}
