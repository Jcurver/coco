import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { LoginType } from 'src/common/constants';

export class CreateUserDto {
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ValidateIf((o) => o.loginType === LoginType.GOOGLE)
  @IsEmpty()
  password?: string;

  @ValidateIf((o) => o.loginType === LoginType.EMAIL)
  @IsEmpty()
  googleUserId?: string;

  @ValidateIf((o) => o.loginType === LoginType.EMAIL)
  @IsEmpty()
  appleUserId?: string;

  @IsNotEmpty()
  loginType?: LoginType;

  @IsOptional()
  profileImageUrl?: string;

  @IsOptional()
  uuid: string;

  @IsOptional()
  isVerified: boolean;

  @IsOptional()
  platform: string;

  @IsOptional()
  version: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
