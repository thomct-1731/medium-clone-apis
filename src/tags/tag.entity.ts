import { Entity, Column, ManyToMany } from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';

import { BaseEntity } from '../common/base.entity';
import { Article } from '../articles/article.entity';
import { TAG_CONSTANTS } from './tag.constant';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ unique: true })
  @MinLength(TAG_CONSTANTS.NAME.MIN_LENGTH)
  @MaxLength(TAG_CONSTANTS.NAME.MAX_LENGTH)
  name: string;

  @ManyToMany(() => Article, (article) => article.tagList)
  articles: Article[];
}
