import { MazeDto, PosnDto, SearchTypeEnum } from './index';

export class GetSearchDto {
  readonly maze: MazeDto;
  readonly type: SearchTypeEnum;
  readonly source: PosnDto;
  readonly target: PosnDto;

  constructor(
    maze: MazeDto,
    type: SearchTypeEnum,
    source: PosnDto,
    target: PosnDto,
  ) {
    this.maze = maze;
    this.type = type;
    this.source = source;
    this.target = target;
  }
}
