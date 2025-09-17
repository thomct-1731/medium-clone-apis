import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RegisterRequest {
  @ApiProperty({ type: CreateUserDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}

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
