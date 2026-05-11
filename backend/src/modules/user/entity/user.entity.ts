import { Types } from "mongoose"
import { AGENT } from "./user.enums"

export interface IUser {
    _id: Types.ObjectId
    name: string
    email: string
    password: string | null
    agent: AGENT
    otp?: string
    otpExpiry?: Date
    isVerified: boolean
}

export class User implements IUser {
    _id!: Types.ObjectId
    name!: string
    email!: string
    password!: string
    agent!: AGENT
    otp!: string
    otpExpiry!: Date
    isVerified!: boolean
}