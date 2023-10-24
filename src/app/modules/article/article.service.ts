import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entities';
import {
  ArticleInterface,
  CreateArticleInterface,
  ReadArticleInterface,
  UpdateArticleInterface,
  DeleteArticleInterface,
} from './interfaces';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(args: CreateArticleInterface): Promise<ArticleInterface> {
    return await this.articleRepository.save(args);
  }

  async read(args: ReadArticleInterface): Promise<ArticleInterface[]> {
    return await this.articleRepository.find({ where: args });
  }

  async update(args: UpdateArticleInterface): Promise<ArticleInterface> {
    await this.articleRepository.save(args);
    return await this.articleRepository.findOne({ where: { id: args.id } });
  }

  async delete(args: DeleteArticleInterface): Promise<void> {
    await this.articleRepository.delete(args);
  }
}
