import { IdMap } from '../utils/parents';

export interface SearchResult {
  readonly found: IdMap;
  readonly parents: IdMap;
  readonly path: IdMap;
}
