import { Injectable } from '@nestjs/common';
import Maze from './types/maze';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getMaze(xDim: number, yDim: number, bias: number): Maze {
    xDim = Math.max(1, Math.ceil(xDim));
    yDim = Math.max(1, Math.ceil(yDim));

    return new Maze(xDim, yDim, bias);
  }
}
