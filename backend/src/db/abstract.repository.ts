import { HydratedDocument, Model, MongooseUpdateQueryOptions, ProjectionType, QueryFilter, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";

export abstract class AbstractRepository<T> {
    constructor(protected model: Model<T>) { }

    async create(item: T): Promise<HydratedDocument<T>> {
        return await this.model.create(item)
    }

    async save(item: T) {
        const doc = new this.model(item)
        return await doc.save()
    }

    async findOne(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return await this.model.findOne(filter, projection, options)
    }

    async updateOne(filter: QueryFilter<T>, update: UpdateWithAggregationPipeline | UpdateQuery<T>, options?: MongooseUpdateQueryOptions) {
        return await this.model.updateOne(filter, update, options)
    }

    async findById(id: any, projection?: ProjectionType<T> | null | undefined, options?: QueryOptions<T> & { lean: true; }) {
        return await this.model.findById(id, projection, options)
    }

    async findOneAndUpdate(filter: QueryFilter<T>, update: UpdateQuery<T>, options?: QueryOptions<T>) {
        return await this.model.findOneAndUpdate(filter, update, options)
    }

    async findByIdAndUpdate(id: string, update: UpdateQuery<T>, options?: QueryOptions<T>) {
        return await this.model.findByIdAndUpdate(id, update, options)
    }

    async find(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return await this.model.find(filter, projection, options)
    }
}