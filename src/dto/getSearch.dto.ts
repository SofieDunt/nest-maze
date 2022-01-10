import { MazeDto } from './index';
import { SearchTypes } from '../utils';

export class GetSearchDto {
  readonly maze: MazeDto;
  readonly type: SearchTypes;
  readonly source: number;
  readonly target: number;
}
