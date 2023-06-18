import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/user.repository';

import * as config from 'config';

export interface JwtPayload {
  username: string;
}

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      // secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      // secretOrKey: configService.get<string>('app.jwtSecret') || 'wtf',
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // async validate(payload: JwtPayload) {
  //   const { username } = payload;
  //   const user: UserEntity = await this.userRepository.findOne({ username });

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
  async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
