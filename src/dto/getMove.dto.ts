import { PosnDto, MazeDto, DirectionEnum } from './index';

export class GetMoveDto {
  readonly player: PosnDto;
  readonly maze: MazeDto;
  readonly direction: DirectionEnum;
}
