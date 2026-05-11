import { IUser } from "../modules/user/entity/user.entity";

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}