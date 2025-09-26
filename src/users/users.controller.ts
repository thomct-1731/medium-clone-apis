import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';

import { UsersService } from './users.service';
import {
  RegisterRequest,
  LoginRequest,
  UpdateUserRequest,
} from './dto/user-request.dto';
import { UserResponseDto, ProfileResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users/login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: UserResponseDto,
  })
  login(@Body() request: LoginRequest, @I18n() i18n: I18nContext) {
    const { user: loginUserDto } = request;
    return this.usersService.login(loginUserDto, i18n);
  }

  @Post('users')
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

  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({
    description: 'Get current user success.',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@CurrentUser() userId: number, @I18n() i18n: I18nContext) {
    return this.usersService.getCurrentUser(userId, i18n);
  }

  @Put('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    description: 'Update user success.',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  updateUser(
    @CurrentUser() userId: number,
    @Body() request: UpdateUserRequest,
    @I18n() i18n: I18nContext,
  ) {
    const { user: updateUserDto } = request;
    return this.usersService.updateUser(userId, updateUserDto, i18n);
  }

  @Get('profiles/:username')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ description: 'Profile found', type: ProfileResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  async getProfile(
    @Param('username') username: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.usersService.getProfile(username, i18n);
  }
}
