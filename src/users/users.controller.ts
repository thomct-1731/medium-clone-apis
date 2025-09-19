import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';

import { UsersService } from './users.service';
import { RegisterRequest, LoginRequest } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-reponse.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: UserResponseDto,
  })
  login(@Body() request: LoginRequest, @I18n() i18n: I18nContext) {
    const { user: loginUserDto } = request;
    return this.usersService.login(loginUserDto, i18n);
  }

  @Post()
  @ApiOperation({ summary: 'Registration' })
  @ApiCreatedResponse({
    description: 'The user has been created',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() request: RegisterRequest, @I18n() i18n: I18nContext) {
    const { user: createUserDto } = request;
    return this.usersService.create(createUserDto, i18n);
  }
}
