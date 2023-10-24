import { NestFactory } from '@nestjs/core';
import { AppModule } from '@magic-gophers-test/app';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Magic Gophers Test')
    .setDescription('The Magic Gophers Test API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const configService: ConfigService = app.get(ConfigService);
  const appPort = configService.get('APP_PORT', 3000);
  await app.listen(appPort);
}

bootstrap();
