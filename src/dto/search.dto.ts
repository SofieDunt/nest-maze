import { IdMap } from './index';

export class SearchDto {
  readonly found: IdMap;
  readonly parents: IdMap;
  readonly path: IdMap;

  constructor(found: IdMap, parents: IdMap, path: IdMap) {
    this.found = found;
    this.parents = parents;
    this.path = path;
  }
}
