import { IUser } from "../../../modules/user/entity/user.entity";
import { AbstractRepository } from "../../abstract.repository";
import { User } from "./user.model";

class UserRepository extends AbstractRepository<IUser>{
    constructor(){
        super(User)
    }
}

export default new UserRepository()