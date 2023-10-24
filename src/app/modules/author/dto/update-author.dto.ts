import { UpdateAuthorInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { isEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiFile } from '@magic-gophers-test/decorators';
import { Transform, Type } from 'class-transformer';

export class UpdateAuthorDto implements UpdateAuthorInterface {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  name: string;

  @ApiFile({ required: false })
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  url?: Express.Multer.File;
}
