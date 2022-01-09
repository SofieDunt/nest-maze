import Posn from './posn';
import Maze from './maze';
import Directions from './directions';
import SearchTypes from './searchTypes';

export interface GetMazeRequest {
  readonly xDim: number;
  readonly yDim: number;
  readonly bias: number;
}

export interface MoveRequest {
  readonly player: Posn;
  readonly maze: Maze;
  readonly direction: Directions;
}

export interface SearchRequest {
  readonly maze: Maze;
  readonly type: SearchTypes;
  readonly source: number;
  readonly target: number;
}
