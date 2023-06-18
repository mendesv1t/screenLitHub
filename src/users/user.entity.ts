import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { roles } from '../auth/constants';

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
}
