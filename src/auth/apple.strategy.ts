import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      callbackURL: process.env.APPLE_CALLBACK_URL,
      keyID: process.env.APPLE_KEY_ID,
      // privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
      key: process.env.APPLE_PRIVATE_KEY,
      passReqToCallback: false,
      scope: ['email', 'name'],
    });
  }

  // // eslint-disable-next-line @typescript-eslint/ban-types
  // async validate(payload: any, done: Function) {
  //   // payload에는 Apple에서 전달한 사용자 정보가 포함되어 있습니다.
  //   // 필요에 따라 데이터베이스에 사용자를 저장하거나 기타 처리를 수행하세요.
  //   // 그리고 완료되면 done 함수를 호출하여 사용자 정보를 반환하세요.

  //   done(null, payload);
  // }
}
