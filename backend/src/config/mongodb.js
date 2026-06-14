import mongoose from "mongoose";

export const connectMongoToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.error("MongoDB Failed to connect",error.message)
    }
}