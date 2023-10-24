import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { BucketItem, BucketItemStat, BucketStream } from 'minio';
import { BinaryLike, createHash } from 'crypto';
import * as Path from 'path';
import { resolve } from 'url';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;
  private readonly staticURL: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_END_POINT'),
      port: +this.configService.get('MINIO_PORT'),
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
      region: this.configService.get('MINIO_REGION'),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
    });
    this.staticURL = this.configService.get('MINIO_STATIC_URL');
  }

  private async getBucketItems(bucketStream: BucketStream<BucketItem>): Promise<BucketItem[]> {
    return new Promise((resolve, reject) => {
      const data = [];
      bucketStream.on('data', item => data.push(item));
      bucketStream.on('end', () => resolve(data));
      bucketStream.on('error', err => reject(err));
    });
  }

  private getHash(data: BinaryLike): string {
    return createHash('sha1')
      .update(data)
      .digest('hex');
  }

  private async getUrl(bucketName: string, objectName: string): Promise<string> {
    return this.staticURL
      ? resolve(this.staticURL, `${bucketName}/${objectName}`)
      : await this.minioClient.presignedUrl('GET', bucketName, objectName);
  }

  async upload(bucketName: string, files: Array<Express.Multer.File>): Promise<string[]> {
    if (!files?.length) {
      return [];
    }

    const bucketExists = await this.minioClient.bucketExists(bucketName);

    if (!bucketExists) {
      await this.minioClient.makeBucket(bucketName);
    }

    const objectNames = await Promise.all<string>(
      files.map(async file => {
        const { originalname, mimetype, buffer } = file;
        const { ext } = Path.parse(originalname);
        const hash = this.getHash(buffer);
        const objectName = `${hash}${ext || ''}`;
        const metaData = { 'Content-Type': mimetype };
        await this.minioClient.putObject(bucketName, objectName, buffer, metaData);
        return objectName;
      }),
    );
    if (!objectNames?.length) {
      return [];
    }
    const bucketStream = this.minioClient.listObjects(bucketName);
    const bucketItems = await this.getBucketItems(bucketStream);
    return await Promise.all(
      bucketItems
        .filter(item => !!item?.name && objectNames.includes(item.name))
        .sort((itemA, itemB) => itemB.lastModified.getTime() - itemA.lastModified.getTime())
        .map(item => this.getUrl(bucketName, item.name)),
    );
  }

  async download(
    bucketName: string,
    objectName: string,
  ): Promise<{ stat: BucketItemStat; stream: NodeJS.ReadableStream }> {
    return {
      stat: await this.minioClient.statObject(bucketName, objectName),
      stream: await this.minioClient.getObject(bucketName, objectName),
    };
  }
}
