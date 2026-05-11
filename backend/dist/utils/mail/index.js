"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../../config/env");
const sendMail = async (opts) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        family: 4,
        auth: {
            user: env_1.envConfig.nodemailerEmail,
            pass: env_1.envConfig.nodemailerPass
        }
    });
    await transporter.sendMail(opts);
};
exports.sendMail = sendMail;
