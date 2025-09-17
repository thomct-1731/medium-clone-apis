import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserToken } from './user-token.entity';
import { UserTokensService } from './user-tokens.service';
import { UserTokensController } from './user-tokens.controller';
import { UserTokensRepository } from './user-tokens.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken])],
  controllers: [UserTokensController],
  providers: [UserTokensService, UserTokensRepository],
  exports: [UserTokensService, UserTokensRepository],
})
export class UserTokensModule {}
