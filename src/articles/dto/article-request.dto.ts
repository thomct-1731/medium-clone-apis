import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';

export class CreateArticleRequest {
  @ApiProperty({ type: CreateArticleDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateArticleDto)
  article: CreateArticleDto;
}

export class UpdateArticleRequest {
  @ApiProperty({ type: UpdateArticleDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateArticleDto)
  article: UpdateArticleDto;
}
