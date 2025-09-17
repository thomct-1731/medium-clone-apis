import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../common/base.entity';
import { User } from '../users/user.entity';

@Entity('user_tokens')
export class UserToken extends BaseEntity {
  @Column()
  token: string;

  @Column()
  refresh_token: string;

  @Column()
  expires_at: Date;

  @ManyToOne(() => User, (user) => user.tokens, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
