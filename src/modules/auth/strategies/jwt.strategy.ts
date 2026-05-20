import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'RAHASIA_NOLIMIT_123', 
    });
  }

  async validate(payload: any) {
    // Return data ini bakal masuk ke req.user di controller
    return { userId: payload.sub, email: payload.email }; 
  }
}