import { AuthorInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class AuthorDto implements AuthorInterface {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  url: string;
}
