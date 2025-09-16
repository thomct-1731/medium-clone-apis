import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity } from '../common/base.entity';
import { Article } from '../articles/article.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Article, (article) => article.tagList)
  articles: Article[];
}
