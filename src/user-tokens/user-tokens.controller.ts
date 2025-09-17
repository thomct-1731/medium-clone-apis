import { Controller, Body, Patch, Param } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';

@Controller('user-tokens')
export class UserTokensController {
  constructor(private readonly userTokensService: UserTokensService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTokenDto: UpdateUserTokenDto,
  ) {
    return this.userTokensService.update(+id, updateUserTokenDto);
  }
}
