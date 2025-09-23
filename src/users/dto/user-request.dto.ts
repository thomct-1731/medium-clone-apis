import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
  IsEmail,
  MinLength,
} from 'class-validator';

import { CreateUserDto } from './create-user.dto';
import { USER_CONSTANTS } from '../user.contant';

export class RegisterRequest {
  @ApiProperty({ type: CreateUserDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}

export class LoginUserDto {
  @ApiProperty({ example: 'abc@xyz.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(USER_CONSTANTS.PASSWORD.MIN_LENGTH)
  password: string;
}

export class LoginRequest {
  @ApiProperty({ type: LoginUserDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LoginUserDto)
  user: LoginUserDto;
}
