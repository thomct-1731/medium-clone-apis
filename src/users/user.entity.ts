import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../common/base.entity';
import { UserToken } from '../user-tokens/user-token.entity';
import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @OneToMany(() => UserToken, (userToken) => userToken.user)
  tokens: UserToken[];

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
