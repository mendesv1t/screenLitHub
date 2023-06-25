import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { Public } from '../decorator/public';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Res() response, @Body() book: Book) {
    const newBook = await this.bookService.createBook(book);
    return response.status(HttpStatus.CREATED).json({
      newBook,
    });
  }

  @Get(':key')
  @Public()
  async findOneByKey(@Res() response, @Param('key') key) {
    const book = await this.bookService.findOneByKey(key);

    if (book != null) {
      return response.status(HttpStatus.OK).json({
        book,
      });
    }

    return response.status(HttpStatus.NOT_FOUND);
  }
}
