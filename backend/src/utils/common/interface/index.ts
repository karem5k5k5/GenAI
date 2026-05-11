import { Types } from "mongoose"

export interface IJwtPayload {
    _id: Types.ObjectId
    name: string
    email: string
}

