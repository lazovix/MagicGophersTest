import { CreateArticleInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { isEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateArticleDto implements CreateArticleInterface {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  content: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  authorId: number;
}
