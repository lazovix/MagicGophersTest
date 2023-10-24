import { ApiTags, ApiBody, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import {
  UseInterceptors,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
  HttpCode,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { ResponseAuthorDto, CreateAuthorDto, ReadAuthorDto, UpdateAuthorDto, DeleteAuthorDto } from './dto';
import { FileToBodyInterceptor } from '@magic-gophers-test/interceptors';

@ApiTags('Author')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAuthorDto })
  @ApiResponse({ status: 201, type: ResponseAuthorDto })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  @UseInterceptors(FileToBodyInterceptor('url'))
  async create(@Body() body: CreateAuthorDto) {
    return await this.authorService.create(body);
  }

  @Get()
  @ApiResponse({ status: 200, type: ResponseAuthorDto, isArray: true })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async read(@Query() query: ReadAuthorDto) {
    return await this.authorService.read(query);
  }

  @Patch()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateAuthorDto })
  @ApiResponse({ status: 200, type: ResponseAuthorDto })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  @UseInterceptors(FileToBodyInterceptor('url'))
  async update(@Body() body: UpdateAuthorDto) {
    return await this.authorService.update(body);
  }

  @Delete()
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async delete(@Query() query: DeleteAuthorDto) {
    await this.authorService.delete(query);
  }
}
