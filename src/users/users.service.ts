import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { I18nService, I18nContext } from 'nestjs-i18n';

import { CreateUserTokenDto } from '../user-tokens/dto/create-user-token.dto';
import { UserTokensService } from '../user-tokens/user-tokens.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-reponse.dto';
import { User } from './user.entity';
import { UserToken } from '../user-tokens/user-token.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly tokensService: UserTokensService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  private generateTokens(user: User): CreateUserTokenDto {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') ?? '8h';
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: expiresIn,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Number(expiresIn.slice(0, -1)));

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });

    return {
      user_id: user.id,
      token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    };
  }

  private async createUserToken(user: User): Promise<UserToken> {
    return await this.tokensService.create(this.generateTokens(user));
  }

  async create(
    userData: CreateUserDto,
    i18n?: I18nContext,
  ): Promise<UserResponseDto> {
    const lang = i18n?.lang || this.configService.get<string>('DEFAULT_LANG');

    const existingUser = await this.usersRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException(
        this.i18n.t('user.ERRORS.EMAIL_EXIST', { lang }),
      );
    }

    const existingUserByUsername = await this.usersRepository.findByUsername(
      userData.username,
    );
    if (existingUserByUsername) {
      throw new BadRequestException(
        this.i18n.t('user.ERRORS.USERNAME_EXIST', { lang }),
      );
    }

    const newUser = await this.usersRepository.createEntity(userData);
    const userToken = await this.createUserToken(newUser);

    return {
      user: {
        email: newUser.email,
        token: userToken.token,
        username: newUser.username,
        bio: newUser.bio,
        image: newUser.image,
      },
    };
  }
}
