import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { I18nService, I18nContext } from 'nestjs-i18n';

import { CreateUserTokenDto } from '../user-tokens/dto/create-user-token.dto';
import { UserTokensService } from '../user-tokens/user-tokens.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-reponse.dto';
import { User } from './user.entity';
import { UserToken } from '../user-tokens/user-token.entity';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { getLang } from 'src/common/utils/lang.util';
import { hashPassword } from 'src/common/utils/password.util';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly tokensService: UserTokensService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  private generateTokens(user: User): CreateUserTokenDto {
    const payload: JwtPayload = {
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

  private isTokenExpired(token: UserToken): boolean {
    return token.expires_at < new Date();
  }

  private shouldRefreshToken(token: UserToken): boolean {
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

    return token.expires_at < oneHourFromNow;
  }

  private async getOrCreateUserToken(user: User): Promise<UserToken> {
    const existingToken = await this.tokensService.getLatestToken(user.id);

    // no token or the token has expired, generate a new token
    if (!existingToken || this.isTokenExpired(existingToken)) {
      this.logger.log('Invalid or expired token, creating a new one.');
      return this.createUserToken(user);
    }

    // token is valid but close to expiration (< 1 hour), refresh the token
    if (this.shouldRefreshToken(existingToken)) {
      this.logger.log('Token is about to expire, refreshing token.');
      const updatedToken = await this.tokensService.update(
        existingToken.id,
        this.generateTokens(user),
      );
      return updatedToken || this.createUserToken(user);
    }

    return existingToken;
  }

  private async createUserToken(user: User): Promise<UserToken> {
    return await this.tokensService.create(this.generateTokens(user));
  }

  private async validateUser(userId: number, lang?: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('user.ERRORS.NOT_FOUND', { lang }),
      );
    }
    return user;
  }

  private async validateEmail(email: string, lang?: string): Promise<void> {
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException(
        this.i18n.t('user.ERRORS.EMAIL_EXIST', { lang }),
      );
    }
  }

  private async validateUsername(
    username: string,
    lang?: string,
  ): Promise<void> {
    const existingUser = await this.usersRepository.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException(
        this.i18n.t('user.ERRORS.USERNAME_EXIST', { lang }),
      );
    }
  }

  private getUserData(user: User, token: string): UserResponseDto {
    return {
      user: {
        email: user.email,
        token: token,
        username: user.username,
        bio: user.bio,
        image: user.image,
      },
    };
  }

  async create(
    userData: CreateUserDto,
    i18n?: I18nContext,
  ): Promise<UserResponseDto> {
    const lang = getLang(this.configService, i18n);

    await this.validateEmail(userData.email, lang);
    await this.validateUsername(userData.username, lang);

    const newUser = await this.usersRepository.createEntity(userData);
    const userToken = await this.createUserToken(newUser);

    return this.getUserData(newUser, userToken?.token || '');
  }

  async login(
    userData: LoginUserDto,
    i18n?: I18nContext,
  ): Promise<UserResponseDto> {
    const lang = getLang(this.configService, i18n);

    const user = await this.usersRepository.findByEmail(userData.email);

    if (!user || !(await user.comparePassword(userData.password))) {
      throw new BadRequestException(
        this.i18n.t('user.ERRORS.LOGIN_FAILED', { lang }),
      );
    }

    const userToken = await this.getOrCreateUserToken(user);

    return this.getUserData(user, userToken?.token || '');
  }

  async getCurrentUser(
    userId: number,
    i18n?: I18nContext,
  ): Promise<UserResponseDto> {
    const lang = getLang(this.configService, i18n);
    const user = await this.validateUser(userId, lang);
    const userToken = await this.tokensService.getLatestToken(user.id);

    return this.getUserData(user, userToken?.token || '');
  }

  async updateUser(
    userId: number,
    userData: UpdateUserDto,
    i18n?: I18nContext,
  ): Promise<UserResponseDto> {
    const lang = getLang(this.configService, i18n);
    const user = await this.validateUser(userId, lang);

    if (userData.email && userData.email !== user.email) {
      await this.validateEmail(userData.email, lang);
    }

    if (userData.username && userData.username !== user.username) {
      await this.validateUsername(userData.username, lang);
    }

    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    const updatedUser = await this.usersRepository.updateEntity(
      userId,
      userData,
    );
    if (!updatedUser) {
      throw new NotFoundException(
        this.i18n.t('user.ERRORS.UPDATE_FAILED', { lang }),
      );
    }

    const userToken = await this.tokensService.getLatestToken(updatedUser.id);

    return this.getUserData(updatedUser, userToken?.token || '');
  }
}
