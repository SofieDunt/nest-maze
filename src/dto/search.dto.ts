import { IdMap, KeyValDto } from './index';

export class SearchDto {
  readonly found: KeyValDto[];
  readonly parents: KeyValDto[];
  readonly path: KeyValDto[];

  constructor(found: IdMap, parents: IdMap, path: KeyValDto[]) {
    this.found = [];
    this.parents = [];
    this.path = path;

    found.forEach((val, key) => this.found.push(new KeyValDto(key, val)));
    parents.forEach((val, key) => this.parents.push(new KeyValDto(key, val)));
  }
}
