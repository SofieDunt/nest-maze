import Parents from '../utils/parents';

export default class Edge {
  readonly first: number;
  readonly second: number;
  readonly weight: number;

  constructor(first: number, second: number, weight: number) {
    this.first = first;
    this.second = second;
    this.weight = weight;
  }

  cycles(parents: Parents): boolean {
    return parents.findParent(this.first) === parents.findParent(this.second);
  }
}
