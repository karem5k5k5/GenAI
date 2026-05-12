import nodemailer, { SendMailOptions } from "nodemailer";

import SMTPTransport from "nodemailer/lib/smtp-transport";

import { envConfig } from "../../config/env";

export const sendMail = async (opts: SendMailOptions) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: envConfig.nodemailerEmail,
            pass: envConfig.nodemailerPass,
        },
    } as SMTPTransport.Options);

    await transporter.sendMail(opts);
};