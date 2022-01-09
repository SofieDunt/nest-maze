import Posn from './posn';

export default class MazeNode {
  readonly id: number;
  readonly posn: Posn;

  constructor(id: number, posn: Posn) {
    this.id = id;
    this.posn = posn;
  }
}
