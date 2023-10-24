import { ClassSerializerInterceptor, Controller, Get, Param, Response, UseInterceptors } from '@nestjs/common';
import { MinioService } from './minio.service';
import { Response as ExpressResponse } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Minio')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Get(':bucketName/:objectName')
  @ApiResponse({
    status: 200,
    content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } },
  })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async download(
    @Param('bucketName') bucketName: string,
    @Param('objectName') objectName: string,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    const { stat, stream } = await this.minioService.download(bucketName, objectName);
    res.set(stat.metaData);
    stream.pipe(res);
  }
}
