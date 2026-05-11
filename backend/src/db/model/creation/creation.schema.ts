import { Schema } from "mongoose";
import { ICreation } from "../../../modules/creation/entity/creation.entity";
import { CreationType } from "../../../modules/creation/entity/creation.enums";

export const creationSchema = new Schema<ICreation>({
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
        enum: CreationType,
        required: true,
        trim: true
    },
    publish: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
}, { timestamps: true })