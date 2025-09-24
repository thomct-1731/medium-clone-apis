import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptionsWithRequest } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);

    this.logger.log(
      `JWT Strategy initialized with secret: ${config.get<string>('JWT_ACCESS_SECRET') ? 'Set' : 'Not set'}`,
    );
  }

  validate(req: Request, payload: JwtPayload): JwtPayload {
    this.logger.log(`Validating JWT: ${JSON.stringify(payload)}`);

    if (!payload || !payload.sub) {
      this.logger.error('Invalid token payload');
      throw new UnauthorizedException('Invalid token payload');
    }

    this.logger.log(`JWT validation successful for user: ${payload.sub}`);
    return payload;
  }
}
