import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../author/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  key: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Author[];

  @Column({ default: 0 })
  cover_i: number;

  get author_name() {
    return this.authors.map((a) => a.name);
  }
}
