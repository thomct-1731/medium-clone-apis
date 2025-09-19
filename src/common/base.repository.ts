import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  FindManyOptions,
  ObjectLiteral,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.find(options);
  }

  async findById(id: number): Promise<T | null> {
    return this.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
  }

  async createEntity(data: DeepPartial<T>): Promise<T> {
    const newEntity = this.create(data);
    return this.save(newEntity);
  }

  async updateEntity(
    id: number,
    data: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    await this.update(id, data);
    return this.findById(id);
  }

  async deleteEntity(id: number): Promise<void> {
    await this.delete(id);
  }
}
