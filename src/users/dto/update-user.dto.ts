import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

import { USER_CONSTANTS } from '../user.contant';

export class UpdateUserDto {
  @ApiProperty({ example: 'abc@xyz.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(USER_CONSTANTS.USERNAME.MIN_LENGTH)
  @MaxLength(USER_CONSTANTS.USERNAME.MAX_LENGTH)
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(USER_CONSTANTS.PASSWORD.MIN_LENGTH)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string;
}
