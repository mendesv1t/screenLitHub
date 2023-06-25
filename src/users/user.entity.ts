import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { roles } from '../auth/constants';
import { Book } from '../book/book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: roles.USER })
  role: string;

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];

  keys: string[];
}
