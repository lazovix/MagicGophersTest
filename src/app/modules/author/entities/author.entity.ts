import { AuthorInterface } from '../interfaces';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('author')
export class AuthorEntity implements AuthorInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  url: string;
}
