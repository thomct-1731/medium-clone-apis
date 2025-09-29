import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { TagsService } from './tags.service';
import { TagsResponseDto } from './dto/tag-response.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Tags' })
  @ApiOkResponse({
    description: 'Tags retrieved successfully',
    type: TagsResponseDto,
  })
  findAll() {
    return this.tagsService.findAll();
  }
}
