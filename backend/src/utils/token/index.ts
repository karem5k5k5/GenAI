import { envConfig } from "../../config/env";
import jwt from "jsonwebtoken"
import { IJwtPayload } from "../common/interface";

export const generateToken = (payload: IJwtPayload, opts: jwt.SignOptions) => {
    return jwt.sign(payload, envConfig.jwtSecret, opts)
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, envConfig.jwtSecret) as IJwtPayload
}