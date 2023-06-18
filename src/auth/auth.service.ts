import { UserService } from '../user/user.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AppleUserDto } from 'src/user/dto/apple-user.dto';
import { JwtPayload } from './jwt.strategy';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { GoogleUserDto } from 'src/user/dto/google-user.dto';
// import appleSignin from 'apple-signin-auth';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserEntity)
    // private userRepository: UserRepository,
    private JwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.userRepository.createUser(authCredentialsDto);
  // }

  // async signIn(
  //   authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   const { username, password } = authCredentialsDto;
  //   const user = await this.userRepository.findOne({ username });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const payload = { username };
  //     const accessToken = await this.JwtService.sign(payload);
  //     return { accessToken };
  //   } else {
  //     throw new UnauthorizedException('login failed');
  //   }
  // }

  // private async verifyAppleIdToken(token: string) {
  //   try {
  //     const { sub: userAppleId } = await appleSignin.verifyIdToken(token, {
  //       // Optional Options for further verification - Full list can be found here https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  //       audience: process.env.APPLE_CLIENT_ID, // client id - can also be an array
  //       ignoreExpiration: true, // default is false
  //     });

  //     Logger.log('apple id token verified :', userAppleId);

  //     return userAppleId;
  //   } catch (err) {
  //     // Token is not verified
  //     Logger.error(err);
  //     return false;
  //   }
  // }
  private _createAccessToken({ username }: UserEntity): any {
    const user: JwtPayload = { username };
    console.log('user', user);

    const accessToken = this.JwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async authWithApple(appleUserDto: AppleUserDto) {
    const { appleUserId, username } = appleUserDto;
    let user = await this.userService.findOne({
      where: { appleUserId, username },
    });

    let error;
    let token = { accessToken: '' };
    let isSignup = false;
    if (!user) {
      isSignup = true;
      try {
        console.log('hihi');
        user = await this.userService.create(appleUserDto);
        console.log('user', user);
        token = this._createAccessToken(user);
      } catch (err: any) {
        if (err.status === HttpStatus.CONFLICT) {
          error = {
            code: 409,
            message: 'User already signed up with Email',
          };
        }
      }
    } else {
      token = this._createAccessToken(user);
      // this._linkToDog(appleUserDto.uuid, user.id);
    }

    if (!error) {
      // await this._issueSendbirdTokenIfNotExist(user);
    }

    return {
      user,
      ...token,
      error,
      isSignup,
    };
  }

  async authWithGoogle(googleUserDto: GoogleUserDto) {
    const { googleUserId, username } = googleUserDto;
    if (!googleUserId) {
      throw new HttpException('Invalid user info', HttpStatus.UNAUTHORIZED);
    }

    let user = await this.userService.findOne({
      where: { googleUserId, username },
    });
    let error;
    let token = { accessToken: '' };
    let isSignup = false;
    if (!user) {
      isSignup = true;
      try {
        user = await this.userService.create(googleUserDto);
        token = this._createAccessToken(user);
      } catch (err: any) {
        if (err.status === HttpStatus.CONFLICT) {
          error = {
            code: 409,
            message: 'User already signed up with Email',
          };
        }
      }
    } else {
      token = this._createAccessToken(user);
    }

    if (!error) {
    }

    return {
      user,
      ...token,
      error,
      isSignup,
    };
  }

  async withdrawalFromUser(username: string) {
    console.log('userNAME', username);
    const user = await this.userService.findOne({ where: { username } });
    console.log(user);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    await this.userService.deleteUser(user);
    return user;
  }
}
