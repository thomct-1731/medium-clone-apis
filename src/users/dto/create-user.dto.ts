import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';

import { USER_CONSTANTS } from '../user.contant';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(USER_CONSTANTS.USERNAME.MIN_LENGTH)
  @MaxLength(USER_CONSTANTS.USERNAME.MAX_LENGTH)
  username: string;

  @ApiProperty({ example: 'abc@xyz.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(USER_CONSTANTS.PASSWORD.MIN_LENGTH)
  @Exclude({ toPlainOnly: true })
  password: string;
}
