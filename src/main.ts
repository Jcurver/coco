import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
// import * as config from 'config';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // const serverConfig = config.get('server');

  const SERVER_PORT = +process.env.SERVER_PORT || 3000;
  // const SERVER_PORT = 3000;

  await app.listen(SERVER_PORT);

  logger.log(`💡Application listening on port ${SERVER_PORT}`);
}
bootstrap();
