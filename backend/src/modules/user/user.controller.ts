import { Request, Response } from "express";
import userService from "./user.service";
import { envConfig } from "../../config/env";
import { GoogleLoginDTO, LoginDTO, RegisterDTO, ResendOTPDTO, ResetPasswordDTO, VerifyEmailDTO } from "./user.dto";
import { BadRequestException, NotFoundException } from "../../utils/error";

class UserController {

    async register(req: Request, res: Response) {
        // get data from req
        const registerDTO: RegisterDTO = req.body

        // implement business logic 
        await userService.register(registerDTO)

        // send response
        return res.status(201).json({ success: true, message: "user registered successfully" })
    }

    async verifyEmail(req: Request, res: Response) {
        // get data from req
        const verifyEmailDTO: VerifyEmailDTO = req.body

        // implement business logic
        await userService.verifyEmail(verifyEmailDTO)

        // send response
        return res.status(200).json({ success: true, message: "email verified successfully" })
    }

    async login(req: Request, res: Response) {
        // get data from req
        const loginDTO: LoginDTO = req.body

        // implement business logic
        const token = await userService.login(loginDTO)

        // inject token into cookies
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: envConfig.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // send response
        return res.status(200).json({ success: true, message: "login successfully" })
    }

    async resendOTP(req: Request, res: Response) {
        // get data from req
        const resendOTPDTO: ResendOTPDTO = req.body

        // implement business logic
        await userService.resendOTP(resendOTPDTO)

        // send response
        return res.status(200).json({ success: true, message: "new otp sent successfully" })
    }

    async logout(req: Request, res: Response) {
        // destroy token
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: envConfig.nodeEnv === "production",
            sameSite: "strict"
        })

        // send response
        return res.status(200).json({ success: true, message: "logout successfully" })
    }

    async googleLogin(req: Request, res: Response) {
        // get data from req
        const googleLoginDTO: GoogleLoginDTO = req.body

        // implement business logic
        const token = await userService.googleLogin(googleLoginDTO)

        // inject token into cookies
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: envConfig.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // send response
        return res.status(200).json({ success: true, message: "google login successfully" })
    }

    async resetPassword(req: Request, res: Response) {
        // get data from req
        const resetPasswordDTO: ResetPasswordDTO = req.body

        // implement business logic
        await userService.resetPassword(resetPasswordDTO)

        // send response
        return res.status(200).json({ success: true, message: "password reset successfully" })
    }

    async getUserCreations(req: Request, res: Response) {
        // get user from req context
        const user = req.user

        if (!user) {
            throw new NotFoundException("user not found");
        }

        // implement business logic
        const creations = await userService.getUserCreations(user)

        // send response
        return res.status(200).json({ success: true, message: "user creations fetched successfully", data: creations })
    }

    async toggleLikeCreation(req: Request, res: Response) {
        // get user from req context
        const user = req.user

        if (!user) {
            throw new NotFoundException("user not found");
        }

        // get data from req
        const { id } = req.params

        if (typeof id !== "string") {
            throw new BadRequestException("invalid creation id")
        }

        // implement business logic
        const message = await userService.toggleLikeCreation(user, id)

        // send response
        return res.status(200).json({ success: true, message })
    }
}

export default new UserController()