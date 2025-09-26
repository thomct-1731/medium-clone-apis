import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Favorite } from './favorite.entity';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
