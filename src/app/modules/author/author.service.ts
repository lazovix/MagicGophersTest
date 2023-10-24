import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities';
import {
  AuthorInterface,
  CreateAuthorInterface,
  ReadAuthorInterface,
  UpdateAuthorInterface,
  DeleteAuthorInterface,
} from './interfaces';
import { MinioService } from '../minio';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    private readonly minioService: MinioService,
  ) {}

  async create(args: CreateAuthorInterface): Promise<AuthorInterface> {
    const [url] = args.url ? await this.minioService.upload('author', [args.url]) : [undefined];
    const entity = { ...args, url };
    return await this.authorRepository.save(entity);
  }

  async read(args: ReadAuthorInterface): Promise<AuthorInterface[]> {
    return await this.authorRepository.find({ where: args });
  }

  async update(args: UpdateAuthorInterface): Promise<AuthorInterface> {
    const [url] = args.url ? await this.minioService.upload('author', [args.url]) : [undefined];
    const entity = { ...args, url };
    await this.authorRepository.save(entity);
    return await this.authorRepository.findOne({ where: { id: entity.id } });
  }

  async delete(args: DeleteAuthorInterface): Promise<void> {
    await this.authorRepository.delete(args);
  }
}
