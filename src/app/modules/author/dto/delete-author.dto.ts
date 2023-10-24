import { DeleteAuthorInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteAuthorDto implements DeleteAuthorInterface {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
