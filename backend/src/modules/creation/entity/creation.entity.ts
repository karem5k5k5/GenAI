import { Types } from "mongoose"
import { CreationType } from "./creation.enums"

export interface ICreation {
    _id: Types.ObjectId
    prompt: string
    content: string
    type: CreationType
    publish: boolean
    userId: Types.ObjectId
    likes: Types.ObjectId[]
}

export class Creation implements ICreation {
    _id!: Types.ObjectId
    prompt!: string
    content!: string
    type!: CreationType
    publish!: boolean
    userId!: Types.ObjectId
    likes!: Types.ObjectId[]
}