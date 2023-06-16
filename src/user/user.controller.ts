import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ResponseBody } from 'src/common/utils/response';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('test')
  async usertest() {
    return ResponseBody('로그인 성공했습니다.');
  }
}
