import { AuthorDTO } from './AuthorDTO';

type AuthorCollectionDTO = AuthorDTO[];

export class WorkDTO {
  'title': string;
  'covers': number[];
  'authors': AuthorCollectionDTO;
  'authorsName': string[];
  'cover': string;
}
