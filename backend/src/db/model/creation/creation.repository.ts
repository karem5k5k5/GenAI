import { AbstractRepository } from "../../abstract.repository";
import { ICreation } from "../../../modules/creation/entity/creation.entity";
import { Creation } from "./creation.model";

class CreationRepository extends AbstractRepository<ICreation> {
    constructor() {
        super(Creation)
    }
}

export default new CreationRepository()