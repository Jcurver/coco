import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GoogleUserDto } from 'src/user/dto/google-user.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';

@Injectable()
export class GooglePassportStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'wtf',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'wtf',
      callbackURL: `${process.env.DEV_BASE_URL}/auth/google/callback`,
      passReqToCallback: false,
      scope: ['profile', 'email'],
    });
  }

  validate(accessToken: string, profile: Profile, done: VerifyCallback) {
    const user = new GoogleUserDto({
      googleUserId: profile.id,
      username: profile.emails[0].value,
      profileImageUrl: profile._json.picture,
      name: profile._json.name,
    });
    const dto = new GoogleAuthDto();
    dto.accessToken = accessToken;
    dto.user = user;
    done(null, dto);
  }
}
