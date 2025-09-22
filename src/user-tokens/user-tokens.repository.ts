import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../common/base.repository';
import { UserToken } from './user-token.entity';

@Injectable()
export class UserTokensRepository extends BaseRepository<UserToken> {
  constructor(dataSource: DataSource) {
    super(UserToken, dataSource.createEntityManager());
  }
}
