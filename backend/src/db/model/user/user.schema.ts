import { HydratedDocument, Schema } from "mongoose"
import { IUser } from "../../../modules/user/entity/user.entity"
import { AGENT } from "../../../modules/user/entity/user.enums"

export const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxlength: 100,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function(this: HydratedDocument<IUser>): boolean{
            return this.agent === AGENT.local
        }
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    agent: { type: String, enum: AGENT, default: AGENT.local },
    isVerified:{type:Boolean,default:false}
}, { timestamps: true })