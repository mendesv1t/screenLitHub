import { DocDTO } from './DocDTO';

type DocCollectionDTO = DocDTO[];

export class SearchDTO {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: DocCollectionDTO;
  num_found: number;
  q: string;
  offset: any;
}
