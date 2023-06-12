import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/user.entity';
import { Board } from './boards/board.entity';

const IS_DEV = process.env.NODE_ENV === 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || process.env.DEV_MYSQL_HOST,
      port: +process.env.MYSQL_PORT || +process.env.DEV_MYSQL_PORT,
      username: process.env.MYSQL_USER || process.env.DEV_MYSQL_USER,
      password:
        process.env.MYSQL_ROOT_PASSWORD || process.env.DEV_MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE || process.env.DEV_MYSQL_DATABASE,
      entities: [__dirname + 'dist/**/*.entity.{js,ts}', User, Board],
      // synchronize: dbConfig.synchronize,
      synchronize: IS_DEV, //
    }),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
