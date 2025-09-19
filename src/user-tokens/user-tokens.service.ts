import { Injectable } from '@nestjs/common';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UserTokensRepository } from './user-tokens.repository';

@Injectable()
export class UserTokensService {
  constructor(private readonly userTokensRepository: UserTokensRepository) {}

  async create(createUserTokenDto: CreateUserTokenDto) {
    return await this.userTokensRepository.createEntity({
      ...createUserTokenDto,
      user: { id: createUserTokenDto.user_id },
    });
  }
}
