import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  findOne(id: number): Promise<Book> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.bookRepository.findOne({
      where: { id },
      relations: { authors: true },
    });
  }

  findOneByKey(key: string): Promise<Book> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.bookRepository.findOne({
      where: { key },
      relations: { authors: true },
    });
  }

  createBook(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }
}
