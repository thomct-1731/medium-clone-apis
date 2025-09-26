import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../common/base.repository';
import { Article } from './article.entity';

@Injectable()
export class ArticlesRepository extends BaseRepository<Article> {
  constructor(dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async findBySlug(slug: string): Promise<Article | null> {
    return this.findOne({
      where: { slug },
      relations: ['author', 'tagList', 'favoritedBy'],
      select: {
        tagList: { name: true },
        favoritedBy: { id: true },
      },
    });
  }
}
