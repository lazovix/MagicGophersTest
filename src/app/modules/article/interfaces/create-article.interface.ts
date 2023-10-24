import { ArticleInterface } from './article.interface';

export type CreateArticleInterface = Omit<ArticleInterface, 'id'>;
