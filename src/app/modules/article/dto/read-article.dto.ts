import { ReadArticleInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { isEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ReadArticleDto implements ReadArticleInterface {
  @ApiProperty({ required: false, type: 'number' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  @Type(() => Number)
  id: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  title: string;

  @ApiProperty({ required: false, type: 'number' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  @Type(() => Number)
  authorId: number;
}
