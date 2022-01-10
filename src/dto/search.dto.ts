import { IdMap } from '../utils';

export class SearchDto {
  readonly found: IdMap;
  readonly parents: IdMap;
  readonly path: IdMap;
}
