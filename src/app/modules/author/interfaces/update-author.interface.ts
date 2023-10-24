import { AuthorInterface } from './author.interface';

export type UpdateAuthorInterface = Omit<AuthorInterface, 'url'> & {
  url?: Express.Multer.File;
};
