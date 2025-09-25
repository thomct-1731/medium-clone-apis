import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from './tag.entity';
import { TagsService } from './tags.service';
import { TagsRepository } from './tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [],
  providers: [TagsService, TagsRepository],
  exports: [TagsService, TagsRepository],
})
export class TagsModule {}
