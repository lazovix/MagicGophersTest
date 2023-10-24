import { AuthorInterface } from './author.interface';

export type ReadAuthorInterface = Omit<AuthorInterface, 'url'>;
