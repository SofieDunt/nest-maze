import { EdgeDto, MazeNodeDto, PosnDto } from '../dto';
import { Exclude } from 'class-transformer';

export class MazeDto {
  readonly xDim: number;
  readonly yDim: number;
  readonly bias: number;
  readonly nodes: MazeNodeDto[];
  readonly edges: EdgeDto[][];

  @Exclude()
  readonly posnToNode: (posn: PosnDto) => number;

  constructor(
    xDim: number,
    yDim: number,
    bias: number,
    nodes: MazeNodeDto[],
    edges: EdgeDto[][],
  ) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.bias = bias;
    this.nodes = nodes;
    this.edges = edges;
    this.posnToNode = (posn) => posn.x + posn.y * this.xDim;
  }
}
