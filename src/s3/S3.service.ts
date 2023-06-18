import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'ap-northeast-2',
    });
  }

  generateSignedUrl = (bucket: string, key: string) => {
    const params = {
      Bucket: bucket,
      Key: key,
      Expires: 60, // URL이 60초 후에 만료됩니다.
    };

    return this.s3.getSignedUrl('getObject', params);
  };

  async uploadFile(file) {
    console.log('FILEEE', file);
    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // replace with your bucket name
      Key: file.originalname, // file name you want to save as
      Body: file.buffer,
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
    // console.log(result);
    // return this.generateSignedUrl(
    //   process.env.S3_BUCKET_NAME,
    //   file.originalname,
    // );
  }
}
