"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.googleLoginSchema = exports.resendOTPSchema = exports.loginSchema = exports.verifyEmailSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6).trim()
});
exports.verifyEmailSchema = zod_1.z.object({
    email: zod_1.z.email(),
    otp: zod_1.z.string().length(6)
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6).trim()
});
exports.resendOTPSchema = zod_1.z.object({
    email: zod_1.z.email()
});
exports.googleLoginSchema = zod_1.z.object({
    idToken: zod_1.z.string()
});
exports.resetPasswordSchema = zod_1.z.object({
    email: zod_1.z.email(),
    otp: zod_1.z.string().length(6),
    newPassword: zod_1.z.string().min(6).trim()
});
