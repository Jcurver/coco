import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { getManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  async findOne(options?: any): Promise<UserEntity> {
    const user = await UserEntity.findOne(options);
    return user;
  }
  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const {
      // name: socialName,
      username,
      password,
      // googleUserId,
      appleUserId,
      loginType,
      // uuid,
      // platform,
      // version,
    } = userDto;
    // if (loginType === LoginType.GOOGLE && userDto.profileImageUrl) {
    //   const name = socialName || username.split('@')[0];
    //   const image = await this.s3Service.uploadFromUrl(userDto.profileImageUrl, name);
    //   userDto.profileImageUrl = image.Location;
    // }

    let newUser: UserEntity;
    console.log('userDto', userDto);

    await getManager().transaction(
      'READ COMMITTED',
      async (transactionalEntityManager) => {
        // check if the user exists in the db
        const userInDb = await transactionalEntityManager.findOne(UserEntity, {
          where: { username },
        });
        if (userInDb) {
          throw new HttpException(
            `User already exists with username '${username}'`,
            HttpStatus.CONFLICT,
          );
        }
        console.log('appleUserID', appleUserId);
        // Create User

        const user = transactionalEntityManager.create(UserEntity, {
          username,
          password,
          // googleUserId,
          appleUserId,
          loginType,
          // profileImageUrl: userDto.profileImageUrl,
          // settings: new UsersSettingsEntity(),
          // platform,
          // version,
        });

        newUser = await transactionalEntityManager.save(user);
      },
    );
    console.log('hihi22');
    // const event = new UserCreatedEvent();
    // event.user = newUser;
    // this.eventEmitter.emit(UserCreatedEvent.Key, event);

    return newUser;
  }

  async findByPayload({ username }: any): Promise<UserEntity> {
    return await this.findOne({
      where: { username },
    });
  }
  async me(user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
