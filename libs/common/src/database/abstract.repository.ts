import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(data: Omit<TDocument, '_id'>): Promise<TDocument> {
    this.logger.debug(`Creating a new document`);

    const createdDocument = new this.model({
      ...data,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    this.logger.debug(`Finding a document`);

    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(`Document not found with filter query: ${filterQuery}`);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    this.logger.debug(`Finding and updating a document`);

    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(`Document not found with filter query: ${filterQuery}`);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findMany(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    this.logger.debug(`Finding many documents`);

    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    this.logger.debug(`Finding and deleting a document`);

    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(`Document not found with filter query: ${filterQuery}`);
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
