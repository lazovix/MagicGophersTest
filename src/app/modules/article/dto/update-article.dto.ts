import { UpdateArticleInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { isEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateArticleDto implements UpdateArticleInterface {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  title: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  content: string;

  @ApiProperty({ required: false, nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  authorId: number;
}
