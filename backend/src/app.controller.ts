import { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connection";
import { globalErrorHandler } from "./utils/global-error-handler";
import userRouter from "./modules/user/user.router";
import creationRouter from "./modules/creation/creation.router";
import connectCloudinary from "./pkg/cloudinary/cloudinary.config";

export const bootstrap = (app: Express, express: any) => {
    // connect database
    connectDB()
    // connect cloudinary
    connectCloudinary()
    // parse req body data
    app.use(express.json())
    // parse cookies 
    app.use(cookieParser())
    // setup cors
    const allowedOrigins = ["http://localhost:5173", ...(process.env.ALLOWED_ORIGINS?.split(",") ?? [])]
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) callback(null, true)
            else callback(new Error("Not allowed by CORS"))
        },
        credentials: true
    }))
    // default router
    app.get("/", (req: Request, res: Response) => {
        return res.status(200).json({ success: true, message: "Hello from GenAI server" })
    })
    // user router
    app.use("/user", userRouter)
    // creation router
    app.use("/creation", creationRouter)
    // invalid router
    app.use("/{*dummy}", (req: Request, res: Response) => {
        return res.status(404).json({ success: false, message: "Invalid router" })
    })
    // global error handler
    app.use(globalErrorHandler)
}