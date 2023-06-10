import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
// import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // const serverConfig = config.get('server');

  const PORT = 5000;

  await app.listen(PORT);
  logger.log(`💡Application listening on port ${PORT}`);
}
bootstrap();
