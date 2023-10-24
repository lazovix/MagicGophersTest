import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('TYPEORM_TYPE'),
      host: this.configService.get('TYPEORM_HOST'),
      port: this.configService.get<number>('TYPEORM_PORT'),
      username: this.configService.get('TYPEORM_USERNAME'),
      password: this.configService.get('TYPEORM_PASSWORD'),
      database: this.configService.get('TYPEORM_DATABASE'),
      schema: this.configService.get('TYPEORM_SCHEMA'),
      entities: [this.configService.get('TYPEORM_ENTITIES')],
      autoLoadEntities: true,
      synchronize: this.configService.get('TYPEORM_SYNCHRONIZE') === 'true',
      migrations: [this.configService.get('TYPEORM_MIGRATIONS')],
      migrationsTableName: this.configService.get('TYPEORM_MIGRATIONS_TABLE_NAME'),
      migrationsRun: this.configService.get('TYPEORM_MIGRATIONS_RUN') === 'true',
      logging: this.configService.get('TYPEORM_LOGGING', 'false') === 'true',
    } as TypeOrmModuleOptions;
  }
}
