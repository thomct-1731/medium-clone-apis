import { Injectable, Logger } from '@nestjs/common';

import { TagsRepository } from './tags.repository';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(private readonly tagsRepository: TagsRepository) {}

  async createTags(tagList: string[]): Promise<Tag[]> {
    const normalized = tagList.map((t) => t.trim().toLowerCase());

    const existingTags = await this.tagsRepository.findByNames(normalized);
    const existingNames = existingTags.map((t) => t.name);

    const newTags = normalized
      .filter((t) => !existingNames.includes(t))
      .map((name) => this.tagsRepository.create({ name }));

    if (newTags.length > 0) {
      await this.tagsRepository.save(newTags);
    }

    return [...existingTags, ...newTags];
  }
}
