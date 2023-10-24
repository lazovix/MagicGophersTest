import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities';
import { MinioModule } from '../minio';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity]), MinioModule],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
