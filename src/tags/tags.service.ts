import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { TagsRepository } from './tags.repository';
import { TagsResponseDto } from './dto/tag-response.dto';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(private readonly tagsRepository: TagsRepository) {}

  async findAll(): Promise<TagsResponseDto> {
    const tags = await this.tagsRepository.findAllNames();

    this.logger.log(`Retrieved ${tags.length} tags`);

    return plainToInstance(
      TagsResponseDto,
      { tags },
      { excludeExtraneousValues: true },
    );
  }
}
