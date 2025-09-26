import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsOptional,
} from 'class-validator';

import { ARTICLE_CONSTANTS } from '../article.constant';

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(ARTICLE_CONSTANTS.TITLE.MIN_LENGTH)
  @MaxLength(ARTICLE_CONSTANTS.TITLE.MAX_LENGTH)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(ARTICLE_CONSTANTS.DESCRIPTION.MIN_LENGTH)
  @MaxLength(ARTICLE_CONSTANTS.DESCRIPTION.MAX_LENGTH)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  tagList?: string[];
}
