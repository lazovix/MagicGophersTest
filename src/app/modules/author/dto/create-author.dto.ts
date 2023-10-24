import { isEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiFile } from '@magic-gophers-test/decorators';
import { CreateAuthorInterface } from '../interfaces';
import { Transform } from 'class-transformer';

export class CreateAuthorDto implements CreateAuthorInterface {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiFile({ required: false })
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  url?: Express.Multer.File;
}
