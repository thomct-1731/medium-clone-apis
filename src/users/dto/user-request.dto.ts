import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { USER_CONSTANTS } from '../user.constant';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

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

export class UpdateUserRequest {
  @ApiProperty({ type: UpdateUserDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;
}
