import { Router } from "express";
import userController from "./user.controller";
import { isValid } from "../../middleware/validation.middleware";
import { googleLoginSchema, loginSchema, registerSchema, resendOTPSchema, resetPasswordSchema, verifyEmailSchema } from "./user.dto";
import { Authenticate } from "../../middleware/auth.middleware";

const router = Router()

router.post("/register", isValid(registerSchema), userController.register)
router.post("/verify", isValid(verifyEmailSchema), userController.verifyEmail)
router.post("/login", isValid(loginSchema), userController.login)
router.post("/resend-otp", isValid(resendOTPSchema), userController.resendOTP)
router.post("/logout", Authenticate, userController.logout)
router.post("/google-login", isValid(googleLoginSchema), userController.googleLogin)
router.patch("/reset-password", isValid(resetPasswordSchema), userController.resetPassword)
router.get("/creations", Authenticate, userController.getUserCreations)
router.patch("/toggle-like/:id", Authenticate, userController.toggleLikeCreation)

export default router