import { ApiProperty } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';

export class UserDataDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  image?: string;
}

export class UserResponseDto {
  @ApiProperty({ type: UserDataDto })
  user: UserDataDto;
}

export class ProfileDataDto {
  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty({ required: false })
  @Expose()
  bio?: string;

  @ApiProperty({ required: false })
  @Expose()
  image?: string;

  @ApiProperty()
  @Expose()
  following: boolean;

  @ApiProperty()
  @Expose()
  following_count: number;

  @ApiProperty()
  @Expose()
  followers_count: number;
}

export class ProfileResponseDto {
  @ApiProperty({ type: ProfileDataDto })
  @Expose()
  @Type(() => ProfileDataDto)
  profile: ProfileDataDto;
}
