import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { BaseEntity } from '../common/base.entity';
import { Tag } from '../tags/tag.entity';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { ARTICLE_CONSTANTS } from './article.constant';
import { ArticleStatus } from './article.enum';

@Entity('articles')
export class Article extends BaseEntity {
  @Column({ unique: true })
  @MinLength(ARTICLE_CONSTANTS.SLUG.MIN_LENGTH)
  @MaxLength(ARTICLE_CONSTANTS.SLUG.MAX_LENGTH)
  slug: string;

  @Column()
  @MinLength(ARTICLE_CONSTANTS.TITLE.MIN_LENGTH)
  @MaxLength(ARTICLE_CONSTANTS.TITLE.MAX_LENGTH)
  title: string;

  @Column({ type: 'text' })
  @MinLength(ARTICLE_CONSTANTS.DESCRIPTION.MIN_LENGTH)
  @MaxLength(ARTICLE_CONSTANTS.DESCRIPTION.MAX_LENGTH)
  description: string;

  @Column({ type: 'text' })
  body: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.DRAFT,
  })
  status: ArticleStatus;

  @ManyToOne(() => User, (user) => user.articles, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true })
  @JoinTable({
    name: 'article_tags',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tagList: Tag[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.favorites, { cascade: true })
  @JoinTable({
    name: 'favorites',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  favoritedBy: User[];

  @Expose()
  get favorited(): boolean {
    return this.favoritedBy?.length > 0 || false;
  }

  @Expose()
  get favoritesCount(): number {
    return this.favoritedBy?.length ?? 0;
  }
}
