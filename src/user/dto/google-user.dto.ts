import { Equals, IsNotEmpty } from 'class-validator';
import { LoginType } from 'src/common/constants';
import { CreateUserDto } from './create-user.dto';

export class GoogleUserDto extends CreateUserDto {
  @IsNotEmpty()
  googleUserId: string;

  @Equals(LoginType.GOOGLE)
  loginType?: LoginType = LoginType.GOOGLE;

  accessToken: string;
}
