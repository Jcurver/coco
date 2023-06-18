import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // get query parameters
    const { redirect_url, uuid } = context.switchToHttp().getRequest().query;

    // set redirect_url to the cookie
    if (redirect_url) {
      context.switchToHttp().getResponse().cookie('redirect_url', redirect_url);
    }

    if (uuid) {
      context.switchToHttp().getResponse().cookie('uuid', uuid);
    }

    return super.canActivate(context);
  }
}
