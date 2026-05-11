import "dotenv/config"

export const envConfig = {
    nodeEnv: process.env.NODE_ENV??"",
    port: process.env.PORT??"",
    dbURL: process.env.DB_URL??"",
    nodemailerEmail: process.env.NODEMAILER_EMAIL??"",
    nodemailerPass: process.env.NODEMAILER_PASS??"",
    jwtSecret: process.env.JWT_SECRET??"",
    googleClientId: process.env.GOOGLE_CLIENT_ID??"",
    geminiApiKey: process.env.GEMINI_API_KEY??"",
    clipDropApiKey: process.env.CLIBDROP_API_KEY??"",
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME??"",
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY??"",
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET??""
}