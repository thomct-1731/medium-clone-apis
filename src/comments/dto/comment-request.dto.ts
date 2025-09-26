import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateCommentDto } from './create-comment.dto';

export class CreateCommentRequest {
  @ApiProperty({ type: CreateCommentDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCommentDto)
  comment: CreateCommentDto;
}
