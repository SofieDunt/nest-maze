import { MazeDto } from './index';
import { SearchTypeEnum } from '../enum';

export class GetSearchDto {
  readonly maze: MazeDto;
  readonly type: SearchTypeEnum;
  readonly source: number;
  readonly target: number;
}
