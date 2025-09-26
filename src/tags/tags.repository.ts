import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Tag } from './tag.entity';

@Injectable()
export class TagsRepository extends BaseRepository<Tag> {
  constructor(dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async findByNames(names: string[]): Promise<Tag[]> {
    return this.find({ where: { name: In(names) } });
  }
}
