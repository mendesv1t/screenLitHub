import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { SearchDTO } from './SearchDTO';
import { WorkDTO } from './WorkDTO';
import { AuthorDTO } from './AuthorDTO';

@Injectable()
export class OpenLibraryService {
  constructor(private readonly httpService: HttpService) {}

  search(query: string): Promise<AxiosResponse<SearchDTO>> {
    const baseURL = 'https://openlibrary.org/search.json?q=';
    const parameters = '&fields=isbn,cover_i,title,author_name,key&limit=30';

    const q = query.replace(' ', '+');

    return this.httpService.axiosRef.get(baseURL + q + parameters);
  }

  getCover(id: number): Promise<AxiosResponse<any>> {
    const baseURL = 'https://covers.openlibrary.org/b/id/';
    const parameters = '-M.jpg';

    return this.httpService.axiosRef.get(baseURL + id + parameters, {
      responseType: 'arraybuffer',
    });
  }

  getCoverURL(id: number) {
    const baseURL = 'https://covers.openlibrary.org/b/id/';
    const parameters = '-M.jpg';

    return baseURL + id + parameters;
  }

  getWork(key: string): Promise<AxiosResponse<WorkDTO>> {
    const baseURL = 'https://openlibrary.org/';
    const json = '.json';

    return this.httpService.axiosRef.get(baseURL + key + json);
  }

  async getBook(key: string) {
    const resultado = await this.getWork(key);

    const workDTO = resultado.data;

    for (const a of workDTO.authors) {
      const response = await this.getAuthorName(a.author.key);

      workDTO.authorsName = [];
      workDTO.authorsName.push(response.data.name);
    }

    for (const c of workDTO.covers) {
      workDTO.cover = await this.getCoverBase64(c);
    }

    return workDTO;
  }

  getAuthorName(key: string): Promise<AxiosResponse<AuthorDTO>> {
    const baseURL = 'https://openlibrary.org/';
    const json = '.json';

    return this.httpService.axiosRef.get(baseURL + key + json);
  }

  async getCoverBase64(id) {
    const resultado = await this.getCover(id);

    return this.encodeBase64(resultado.data);
  }

  encodeBase64(data) {
    return Buffer.from(data).toString('base64');
  }
}
