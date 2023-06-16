import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from '@nestjs/config';
import { UserEntity } from 'src/user/entities/user.entity';

// const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // synchronize: dbConfig.synchronize,
  synchronize: true,
};
