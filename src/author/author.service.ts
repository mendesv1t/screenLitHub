import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  findOne(id: bigint): Promise<Author> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.authorRepository.findOne({ where: { id } });
  }

  createAuthor(author: Author): Promise<Author> {
    return this.authorRepository.save(author);
  }
}
