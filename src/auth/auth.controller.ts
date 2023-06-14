import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/authTest')
  @UseGuards(AuthGuard())
  authTest(@GetUser() user: User) {
    console.log(user);
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleLogin(@Request() req) {
    // Apple 로그인을 시작하는 엔드포인트
    return req.user;
  }

  @Get('apple/callback')
  @UseGuards(AuthGuard('apple'))
  async appleLoginCallback(@Request() req) {
    // Apple 로그인 후 callback되는 엔드포인트
    // 사용자 정보는 req.user 에 저장됩니다.
    return req.user;
  }
}
