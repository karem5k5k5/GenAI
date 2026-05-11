import type { NextFunction, Request, Response } from "express"
import { NotFoundException, UnAuthorizedException } from "../utils/error"
import { verifyToken } from "../utils/token"
import userRepository from "../db/model/user/user.repository"

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    // get token from cookies
    const token = req.cookies.accessToken
    if (!token) {
        throw new UnAuthorizedException("jwt is required")
    }

    // verify token
    const payload = verifyToken(token)

    // check user existence
    const user = await userRepository.findById(payload._id)
    if (!user) {
        throw new NotFoundException("user not found")
    }

    // inject user into req
    req.user = user

    // call next
    next()
}