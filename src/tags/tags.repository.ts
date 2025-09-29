import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../common/base.repository';
import { Tag } from './tag.entity';

@Injectable()
export class TagsRepository extends BaseRepository<Tag> {
  constructor(dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async findAllNames(): Promise<string[]> {
    const tags = await this.find({
      select: {
        name: true,
      },
    });
    return tags.map((tag) => tag.name);
  }
}
