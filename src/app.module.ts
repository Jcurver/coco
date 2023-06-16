import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import {
  AuthenticationMiddleware,
  ignoreAuthenticationPaths,
} from './middleware/authentication.middleware';

// const IS_DEV = process.env.NODE_ENV === 'development';
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
      entities: [__dirname + 'dist/**/*.entity.{js,ts}', UserEntity],
      // synchronize: dbConfig.synchronize,
      // synchronize: IS_DEV, //
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        ...Array.from(ignoreAuthenticationPaths, (path) => ({
          path,
          method: RequestMethod.ALL,
        })),
      )
      .forRoutes('*');
  }
}
