// authentication.middleware.ts

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { invalid } from 'joi';
import { verify } from 'jsonwebtoken';

export const ignoreAuthenticationPaths = ['/auth/apple'];

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 로그인 API 라우트를 확인하여 유효성 검사를 건너뜁니다.

    if (req.originalUrl in ignoreAuthenticationPaths) {
      return next();
    }

    // 토큰을 가져와 확인합니다.
    const AccessToken = req.headers.authorization?.split(' ')[1];

    if (!AccessToken) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // 토큰이 유효한지 검증합니다. secret 키는 환경 변수나 config에서 가져와야 합니다.
      const decoded = verify(AccessToken, process.env.JWT_SECRET);
      console.log('decoded', decoded);
      // Decoded 정보를 요청에 첨부하여 후속 처리를 할 수 있습니다.
      (req as any).user = decoded;
    } catch (error) {
      next(new UnauthorizedException());
      // return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  }
}
