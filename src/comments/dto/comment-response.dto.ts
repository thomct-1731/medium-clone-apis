import { ApiProperty } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';

import { ProfileDataDto } from 'src/users/dto/user-reponse.dto';

export class CommentDataDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ type: ProfileDataDto })
  @Expose()
  @Type(() => ProfileDataDto)
  author: ProfileDataDto;
}

export class CommentResponseDto {
  @ApiProperty({ type: CommentDataDto })
  @Expose()
  @Type(() => CommentDataDto)
  comment: CommentDataDto;
}

export class CommentsListResponseDto {
  @ApiProperty({ type: [CommentDataDto] })
  @Expose()
  @Type(() => CommentDataDto)
  comments: CommentDataDto[];
}
