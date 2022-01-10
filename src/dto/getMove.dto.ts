import { PosnDto, MazeDto } from './index';
import { DirectionEnum } from '../enum';

export class GetMoveDto {
  readonly player: PosnDto;
  readonly maze: MazeDto;
  readonly direction: DirectionEnum;
}
