import { Controller, Get, Param } from '@nestjs/common';
import { GameDto, SearchTypeEnum } from './dto';
import { MazeService } from './maze/maze.service';
import { SearchService } from './search/search.service';

@Controller()
export class AppController {
  constructor(
    private readonly mazeService: MazeService,
    private readonly searchService: SearchService,
  ) {}

  @Get('/game/:xDim/:yDim/:bias/:source/:target')
  async getMazeGame(
    @Param('xDim') xDim: number,
    @Param('yDim') yDim: number,
    @Param('bias') bias: number,
    @Param('source') source: number,
    @Param('target') target: number,
  ): Promise<GameDto> {
    const maze = await this.mazeService.construct(xDim, yDim, bias);
    const bfsSearch = await this.searchService.search(
      maze,
      SearchTypeEnum.BFS,
      Number(source),
      Number(target),
    );
    const dfsSearch = await this.searchService.search(
      maze,
      SearchTypeEnum.DFS,
      Number(source),
      Number(target),
    );
    return new GameDto(maze, bfsSearch, dfsSearch);
  }
}
