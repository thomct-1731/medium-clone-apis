import bcrypt from 'bcrypt';
import { Exclude, Expose } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';
import { BaseEntity } from '../common/base.entity';
import { hashPassword } from '../common/utils/password.util';
import { UserToken } from '../user-tokens/user-token.entity';
import { USER_CONSTANTS } from './user.constant';

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
    this.password = await hashPassword(this.password);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // TODO: update later
  @Expose()
  get following(): boolean {
    return false;
  }

  @Expose()
  get following_count(): number {
    return 0;
  }

  @Expose()
  get followers_count(): number {
    return 0;
  }
  // TODO
}
