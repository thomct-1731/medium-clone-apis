import { ApiProperty } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';

export class TagsResponseDto {
  @ApiProperty({ type: [String] })
  @Expose()
  @Type(() => String)
  tags: string[];
}
