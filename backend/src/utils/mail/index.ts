import nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/sendmail-transport"
import { envConfig } from "../../config/env"

export const sendMail = async(opts: MailOptions)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        family: 4,
        auth: {
            user: envConfig.nodemailerEmail,
            pass: envConfig.nodemailerPass
        }
    })

    await transporter.sendMail(opts)
}