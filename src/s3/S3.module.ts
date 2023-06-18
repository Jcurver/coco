import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './S3.service';
import { S3Controller } from './S3.controller';

@Module({
  // imports: [HttpModule, ConfigModule],
  providers: [S3Service],
  controllers: [S3Controller],
  exports: [S3Service],
})
export class S3Module {}
