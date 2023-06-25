import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BookService } from '../book/book.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly bookService: BookService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(login: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        login: login,
      },
      relations: {
        books: true,
      },
    });
  }

  createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async addCollection(id, user) {
    const book = await this.bookService.findOne(id);

    const usuario = await this.findOne(user.login);

    if (usuario.books === null || usuario.books === undefined) {
      usuario.books = [];
    }

    usuario.books.push(book);

    await this.userRepository.save(usuario);
  }
}
