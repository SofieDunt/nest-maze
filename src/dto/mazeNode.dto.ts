import { PosnDto } from './index';

export class MazeNodeDto {
  readonly id: number;
  readonly posn: PosnDto;

  constructor(id: number, posn: PosnDto) {
    this.id = id;
    this.posn = posn;
  }
}
