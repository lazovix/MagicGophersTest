import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ResponseArticleDto, CreateArticleDto, ReadArticleDto, UpdateArticleDto, DeleteArticleDto } from './dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Article')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({ status: 201, type: ResponseArticleDto })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() body: CreateArticleDto) {
    return await this.articleService.create(body);
  }

  @Get()
  @ApiResponse({ status: 200, type: ResponseArticleDto, isArray: true })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async read(@Query() query: ReadArticleDto) {
    return await this.articleService.read(query);
  }

  @Patch()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateArticleDto })
  @ApiResponse({ status: 200, type: ResponseArticleDto })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() body: UpdateArticleDto) {
    return await this.articleService.update(body);
  }

  @Delete()
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async delete(@Query() query: DeleteArticleDto) {
    await this.articleService.delete(query);
  }
}
