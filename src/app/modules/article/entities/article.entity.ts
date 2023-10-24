import { ArticleInterface } from '../interfaces';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AuthorEntity } from '../../author';

@Entity('article')
export class ArticleEntity implements ArticleInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ name: 'author_id', nullable: false })
  authorId: number;

  @ManyToOne(type => AuthorEntity, { onUpdate: 'RESTRICT', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'author_id' })
  author: AuthorEntity;
}
