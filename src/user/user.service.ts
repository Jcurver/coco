import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { getManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { LoginType } from 'src/common/constants';
import getRandomNickname from 'src/util/getRandomNickname';

@Injectable()
export class UserService {
  async findOne(options?: any): Promise<UserEntity> {
    const user = await UserEntity.findOne(options);
    console.log('fineone', user);
    return user;
  }
  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const {
      // name: socialName,
      username,
      password,
      googleUserId,
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
    let userFindQueryObject: any = { username };
    if (googleUserId && loginType === LoginType.GOOGLE) {
      userFindQueryObject = { googleUserId, username };
    } else if (appleUserId && loginType === LoginType.APPLE) {
      userFindQueryObject = { appleUserId, username };
    }

    let newUser: UserEntity;

    await getManager().transaction(
      'READ COMMITTED',
      async (transactionalEntityManager) => {
        // check if the user exists in the db
        const userInDb = await transactionalEntityManager.findOne(UserEntity, {
          where: userFindQueryObject,
        });
        if (userInDb) {
          throw new HttpException(
            `User already exists with username '${username}'`,
            HttpStatus.CONFLICT,
          );
        }
        // Create User
        const user = transactionalEntityManager.create(UserEntity, {
          username,
          nickname: getRandomNickname(),
          password,
          googleUserId,
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
  async deleteUser(user: UserEntity): Promise<void> {
    const { id } = user;
    console.log('delete success1');

    // await UserEntity.delete(user.id);
    console.log('delete success2');

    await getManager().transaction(
      'READ COMMITTED',
      async (transactionalEntityManager) => {
        // check if the user exists in the db
        try {
          const userInDb = await transactionalEntityManager.findOne(
            UserEntity,
            {
              where: { id },
            },
          );
          if (!userInDb) {
            throw new HttpException(
              `Invalid UserId '${id}'`,
              HttpStatus.CONFLICT,
            );
          }
          //  delete User
          await transactionalEntityManager.delete(UserEntity, { id });
          console.log('delete success');
        } catch (e) {
          console.log('ERR', e);
        }

        // newUser = await transactionalEntityManager.save(user);
      },
    );
  }
}
