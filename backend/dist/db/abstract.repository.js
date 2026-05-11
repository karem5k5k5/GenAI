"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
class AbstractRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        return await this.model.create(item);
    }
    async save(item) {
        const doc = new this.model(item);
        return await doc.save();
    }
    async findOne(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async updateOne(filter, update, options) {
        return await this.model.updateOne(filter, update, options);
    }
    async findById(id, projection, options) {
        return await this.model.findById(id, projection, options);
    }
    async findOneAndUpdate(filter, update, options) {
        return await this.model.findOneAndUpdate(filter, update, options);
    }
    async findByIdAndUpdate(id, update, options) {
        return await this.model.findByIdAndUpdate(id, update, options);
    }
    async find(filter, projection, options) {
        return await this.model.find(filter, projection, options);
    }
}
exports.AbstractRepository = AbstractRepository;
