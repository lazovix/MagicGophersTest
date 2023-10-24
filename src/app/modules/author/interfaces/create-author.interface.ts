import { AuthorInterface } from './author.interface';

export type CreateAuthorInterface = Omit<AuthorInterface, 'id' | 'url'> & {
  url?: Express.Multer.File;
};
