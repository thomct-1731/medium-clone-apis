import { ApiProperty } from '@nestjs/swagger';

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
