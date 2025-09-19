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
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterRequest } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-reponse.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO; update later
  @Post('login')
  logIn(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
