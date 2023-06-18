import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { OpenLibraryService } from './openLibrary.service';
import { Public } from '../decorator/public';

@Controller('openLibrary')
export class OpenLibraryController {
  constructor(private readonly openLibraryService: OpenLibraryService) {}

  @Public()
  @Get('busca')
  async search(@Res() response, @Query('query') query) {
    const resultado = await this.openLibraryService.search(query);

    const searchDTO = resultado.data;

    for (const s of searchDTO.docs) {
      s.cover_image = await this.openLibraryService.getCoverBase64(s.cover_i);
    }

    return response.status(HttpStatus.OK).json(searchDTO);
  }

  @Public()
  @Get('cover/:id')
  async getCover(@Res() response, @Param('id') id) {
    const resultado = await this.openLibraryService.getCover(id);

    const base64 = this.openLibraryService.encodeBase64(resultado.data);

    return response.status(HttpStatus.OK).json(base64);
  }

  @Public()
  @Get('book')
  async getBook(@Res() response, @Query('key') key) {
    const resultado = await this.openLibraryService.getBook(key);

    return response.status(HttpStatus.OK).json(resultado);
  }
}
