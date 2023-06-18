import { Equals, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { LoginType } from 'src/common/constants';

export class AppleUserDto extends CreateUserDto {
  @IsNotEmpty()
  appleUserId: string;

  @Equals(LoginType.APPLE)
  loginType?: LoginType = LoginType.APPLE;

  constructor(partial: Partial<AppleUserDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
