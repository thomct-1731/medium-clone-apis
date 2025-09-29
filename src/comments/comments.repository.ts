import { DataSource, DeepPartial } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../common/base.repository';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsRepository extends BaseRepository<Comment> {
  constructor(dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async createEntityWithRelations(
    data: DeepPartial<Comment>,
  ): Promise<Comment | null> {
    const newEntity = this.create(data);
    const savedEntity = await this.save(newEntity);

    return this.findOne({
      where: { id: savedEntity.id },
      relations: ['author', 'article'],
    });
  }

  async findByIdWithRelations(id: number): Promise<Comment | null> {
    return this.findOne({ where: { id }, relations: ['author', 'article'] });
  }

  async findByArticleId(articleId: number): Promise<Comment[]> {
    return this.find({
      where: { article: { id: articleId } },
      order: { createdAt: 'DESC' },
      relations: ['author', 'article'],
    });
  }
}
