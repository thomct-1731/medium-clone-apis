import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../common/base.repository';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesRepository extends BaseRepository<Favorite> {
  constructor(dataSource: DataSource) {
    super(Favorite, dataSource.createEntityManager());
  }
}
