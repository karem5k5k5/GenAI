import { model } from "mongoose";
import { ICreation } from "../../../modules/creation/entity/creation.entity";
import { creationSchema } from "./creation.schema";

export const Creation = model<ICreation>("Creation", creationSchema)