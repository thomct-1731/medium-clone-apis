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
  login(@Body() request: LoginRequest) {
    const { user: loginUserDto } = request;
    return this.usersService.login(loginUserDto);
  }

  @Post()
  @ApiOperation({ summary: 'Registration' })
  @ApiCreatedResponse({
    description: 'The user has been created',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() request: RegisterRequest) {
    const { user: createUserDto } = request;
    return this.usersService.create(createUserDto);
  }
}
