import { PosnDto } from './index';

export class MazeNodeDto {
  readonly id: number;
  readonly posn: PosnDto;
  hasPathToRight: boolean;
  hasPathToBottom: boolean;

  constructor(id: number, posn: PosnDto) {
    this.id = id;
    this.posn = posn;
    this.hasPathToRight = false;
    this.hasPathToBottom = false;
  }

  setHasPathToRight(hasPath: boolean) {
    this.hasPathToRight = hasPath;
  }

  setHasPathToBottom(hasPath: boolean) {
    this.hasPathToBottom = hasPath;
  }
}
