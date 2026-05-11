"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const env_1 = require("../../config/env");
const error_1 = require("../../utils/error");
class UserController {
    async register(req, res) {
        // get data from req
        const registerDTO = req.body;
        // implement business logic 
        await user_service_1.default.register(registerDTO);
        // send response
        return res.status(201).json({ success: true, message: "user registered successfully" });
    }
    async verifyEmail(req, res) {
        // get data from req
        const verifyEmailDTO = req.body;
        // implement business logic
        await user_service_1.default.verifyEmail(verifyEmailDTO);
        // send response
        return res.status(200).json({ success: true, message: "email verified successfully" });
    }
    async login(req, res) {
        // get data from req
        const loginDTO = req.body;
        // implement business logic
        const token = await user_service_1.default.login(loginDTO);
        // inject token into cookies
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: env_1.envConfig.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        // send response
        return res.status(200).json({ success: true, message: "login successfully" });
    }
    async resendOTP(req, res) {
        // get data from req
        const resendOTPDTO = req.body;
        // implement business logic
        await user_service_1.default.resendOTP(resendOTPDTO);
        // send response
        return res.status(200).json({ success: true, message: "new otp sent successfully" });
    }
    async logout(req, res) {
        // destroy token
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: env_1.envConfig.nodeEnv === "production",
            sameSite: "strict"
        });
        // send response
        return res.status(200).json({ success: true, message: "logout successfully" });
    }
    async googleLogin(req, res) {
        // get data from req
        const googleLoginDTO = req.body;
        // implement business logic
        const token = await user_service_1.default.googleLogin(googleLoginDTO);
        // inject token into cookies
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: env_1.envConfig.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        // send response
        return res.status(200).json({ success: true, message: "google login successfully" });
    }
    async resetPassword(req, res) {
        // get data from req
        const resetPasswordDTO = req.body;
        // implement business logic
        await user_service_1.default.resetPassword(resetPasswordDTO);
        // send response
        return res.status(200).json({ success: true, message: "password reset successfully" });
    }
    async getUserCreations(req, res) {
        // get user from req context
        const user = req.user;
        if (!user) {
            throw new error_1.NotFoundException("user not found");
        }
        // implement business logic
        const creations = await user_service_1.default.getUserCreations(user);
        // send response
        return res.status(200).json({ success: true, message: "user creations fetched successfully", data: creations });
    }
    async toggleLikeCreation(req, res) {
        // get user from req context
        const user = req.user;
        if (!user) {
            throw new error_1.NotFoundException("user not found");
        }
        // get data from req
        const { id } = req.params;
        if (typeof id !== "string") {
            throw new error_1.BadRequestException("invalid creation id");
        }
        // implement business logic
        const message = await user_service_1.default.toggleLikeCreation(user, id);
        // send response
        return res.status(200).json({ success: true, message });
    }
}
exports.default = new UserController();
