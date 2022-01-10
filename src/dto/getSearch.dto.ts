import { MazeDto, SearchTypeEnum } from './index';

export class GetSearchDto {
  readonly maze: MazeDto;
  readonly type: SearchTypeEnum;
  readonly source: number;
  readonly target: number;
}
