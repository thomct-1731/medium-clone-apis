import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsEmail()
  refresh_token: string;

  @ApiProperty()
  @IsNotEmpty()
  expires_at: Date;
}
