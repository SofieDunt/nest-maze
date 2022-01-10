import { MazeDto, PosnDto, SearchTypeEnum } from './index';

export class GetSearchDto {
  readonly maze: MazeDto;
  readonly type: SearchTypeEnum;
  readonly source: PosnDto;
  readonly target: PosnDto;
}
