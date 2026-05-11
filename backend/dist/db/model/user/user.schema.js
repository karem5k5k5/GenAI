"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const user_enums_1 = require("../../../modules/user/entity/user.enums");
exports.userSchema = new mongoose_1.Schema({
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
        required: function () {
            return this.agent === user_enums_1.AGENT.local;
        }
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    agent: { type: String, enum: user_enums_1.AGENT, default: user_enums_1.AGENT.local },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });
