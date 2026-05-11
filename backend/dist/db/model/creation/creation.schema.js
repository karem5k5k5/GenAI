"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creationSchema = void 0;
const mongoose_1 = require("mongoose");
const creation_enums_1 = require("../../../modules/creation/entity/creation.enums");
exports.creationSchema = new mongoose_1.Schema({
    prompt: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: creation_enums_1.CreationType,
        required: true,
        trim: true
    },
    publish: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
}, { timestamps: true });
