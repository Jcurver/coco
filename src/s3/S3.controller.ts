import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';

import { ResponseBody } from 'src/common/utils/response';
import { S3Service } from './S3.service';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photo')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  // @UseInterceptors(FilesInterceptor('images', null, S3Service.config()))
  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file, @Res() res) {
    const data: any = await this.s3Service.uploadFile(file);
    return res.status(200).json(ResponseBody(data.Location || ''));
  }
}
