import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

import { ARTICLE_CONSTANTS } from '../article.constant';

export class UpdateArticleDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(ARTICLE_CONSTANTS.TITLE.MIN_LENGTH)
  @MaxLength(ARTICLE_CONSTANTS.TITLE.MAX_LENGTH)
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(ARTICLE_CONSTANTS.DESCRIPTION.MIN_LENGTH)
  @MaxLength(ARTICLE_CONSTANTS.DESCRIPTION.MAX_LENGTH)
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  body?: string;
}
