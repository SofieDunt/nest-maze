import { PosnDto, MazeDto } from './index';
import { Directions } from '../utils';

export class GetMoveDto {
  readonly player: PosnDto;
  readonly maze: MazeDto;
  readonly direction: Directions;
}
