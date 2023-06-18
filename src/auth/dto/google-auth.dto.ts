import { GoogleUserDto } from 'src/user/dto/google-user.dto';

export class GoogleAuthDto {
  accessToken: string;
  user: GoogleUserDto;
}
