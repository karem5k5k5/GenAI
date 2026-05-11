"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_repository_1 = require("../../abstract.repository");
const creation_model_1 = require("./creation.model");
class CreationRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(creation_model_1.Creation);
    }
}
exports.default = new CreationRepository();
