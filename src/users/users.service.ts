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

  async removeCollection(id, user) {
    const book = await this.bookService.findOne(id);

    const usuario = await this.findOne(user.login);

    let index = -1;

    for (const [i, b] of usuario.books.entries()) {
      if (b.id === book.id) {
        index = i;
      }
    }

    if (index !== -1) {
      usuario.books.splice(index, 1);

      await this.userRepository.save(usuario);
    }
  }

  async removeCollectionByKey(key, user) {
    const books = await this.bookService.findAllByKey(key);

    const usuario = await this.findOne(user.login);

    let index = -1;

    for (const [i, b] of usuario.books.entries()) {
      for (const book of books) {
        if (b.id === book.id) {
          index = i;
        }
      }
    }

    if (index !== -1) {
      usuario.books.splice(index, 1);

      await this.userRepository.save(usuario);
    }
  }
}
