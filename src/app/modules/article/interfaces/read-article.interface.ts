import { ArticleInterface } from './article.interface';

export type ReadArticleInterface = Omit<ArticleInterface, 'content'>;
