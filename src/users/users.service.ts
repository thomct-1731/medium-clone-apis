import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';

import { CreateUserTokenDto } from '../user-tokens/dto/create-user-token.dto';
import { UserTokensService } from '../user-tokens/user-tokens.service';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly tokensService: UserTokensService,
    private readonly configService: ConfigService,
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

  async create(user: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists!');
    }

    const existingUserByUsername = await this.usersRepository.findByUsername(
      user.username,
    );
    if (existingUserByUsername) {
      throw new BadRequestException('Username already exists!');
    }

    const userData = {
      ...user,
      password: await hash(user.password, 10),
    };
    const newUser = await this.usersRepository.createEntity(userData);
    const userToken = await this.tokensService.create(
      this.generateTokens(newUser),
    );

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
