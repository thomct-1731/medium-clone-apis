import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { JwtPayload } from 'src/users/interfaces/jwt-payload.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number | null => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const jwtPayloadOrUser = request.user as JwtPayload;

    if (!jwtPayloadOrUser || !jwtPayloadOrUser.sub) return null;

    return jwtPayloadOrUser.sub;
  },
);
