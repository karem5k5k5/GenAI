import mongoose from "mongoose"
import { envConfig } from "../config/env"

export const connectDB = async () => {
    try {
        await mongoose.connect(envConfig.dbURL)
        console.log("db connected successfully")
    } catch (error) {
        console.log("db connection fail", error)
    }
}