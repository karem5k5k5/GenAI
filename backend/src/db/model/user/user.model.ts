import { model } from "mongoose";
import { userSchema } from "./user.schema";
import { IUser } from "../../../modules/user/entity/user.entity";

export const User = model<IUser>("User", userSchema)