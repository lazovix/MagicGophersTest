import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '@magic-gophers-test/configs';
import { MinioModule } from './modules/minio';
import { AuthorModule } from './modules/author';
import { ArticleModule } from './modules/article';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    MinioModule,
    AuthorModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
