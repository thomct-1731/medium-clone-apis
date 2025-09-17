import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../common/base.entity';
import { UserToken } from '../user-tokens/user-token.entity';

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
}
