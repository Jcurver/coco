import { UserEntity } from 'src/user/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  Response,
  SerializeOptions,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { AppleUserDto } from 'src/user/dto/apple-user.dto';
import { ResponseBody } from 'src/common/utils/response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/signup')
  // signUp(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<void> {
  //   return this.authService.signUp(authCredentialsDto);
  // }

  // @Post('/signin')
  // signIn(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(authCredentialsDto);
  // }

  @Post('/authTest')
  @UseGuards(AuthGuard())
  authTest(@GetUser() user: UserEntity) {
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

  // @SerializeOptions({ groups: ['private'] })
  @Post('apple')
  async authByApple(
    @Body() appleUserDto: AppleUserDto,
    @Req() req: Request,
    @Res() res,
  ) {
    const { user, accessToken, error, isSignup } =
      await this.authService.authWithApple(appleUserDto);
    console.log('acc', accessToken);

    if (error) {
      if (error.code === 409) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // res.header('Authorization', `Bearer ${accessToken}`);
    return res.status(200).json(ResponseBody({ user, isSignup, accessToken }));
  }

  @Get('me')
  public async me(user: UserEntity) {
    return ResponseBody({ user });
  }
}
