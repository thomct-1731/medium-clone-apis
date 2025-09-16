import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { BaseEntity } from '../common/base.entity';
import { Tag } from '../tags/tag.entity';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity('articles')
export class Article extends BaseEntity {
  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => User, (user) => user.articles, { onDelete: 'CASCADE' })
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
}
