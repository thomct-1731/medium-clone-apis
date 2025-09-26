import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { Match } from '../../common/validators/match.decorator';
import { USER_CONSTANTS } from '../user.constant';

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

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(USER_CONSTANTS.PASSWORD.MIN_LENGTH)
  @Match('password')
  password_confirmation: string;
}
