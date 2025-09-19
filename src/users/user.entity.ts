import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { BaseEntity } from '../common/base.entity';
import { UserToken } from '../user-tokens/user-token.entity';
import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';
import { USER_CONSTANTS } from './user.contant';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(USER_CONSTANTS.PASSWORD.MIN_LENGTH)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ unique: true })
  @MinLength(USER_CONSTANTS.USERNAME.MIN_LENGTH)
  @MaxLength(USER_CONSTANTS.USERNAME.MAX_LENGTH)
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      USER_CONSTANTS.PASSWORD.SALT_ROUNDS,
    );
  }
}
