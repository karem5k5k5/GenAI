import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(6).trim()
})

export type RegisterDTO = z.infer<typeof registerSchema>

export const verifyEmailSchema = z.object({
    email: z.email(),
    otp: z.string().length(6)
})

export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).trim()
})

export type LoginDTO = z.infer<typeof loginSchema>

export const resendOTPSchema = z.object({
    email: z.email()
})

export type ResendOTPDTO = z.infer<typeof resendOTPSchema>

export const googleLoginSchema = z.object({
    idToken: z.string()
})

export type GoogleLoginDTO = z.infer<typeof googleLoginSchema>

export const resetPasswordSchema = z.object({
    email: z.email(),
    otp: z.string().length(6),
    newPassword: z.string().min(6).trim()
})

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>