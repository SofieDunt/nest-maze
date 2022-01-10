import { Body, Controller, Post } from '@nestjs/common';
import { NavigateService } from './navigate.service';
import { GetMoveDto, MazeDto, PlayerDto } from '../dto';

@Controller('navigate')
export class NavigateController {
  constructor(private readonly navigateService: NavigateService) {}

  @Post('move')
  move(@Body() req: GetMoveDto): PlayerDto {
    return this.navigateService.move(
      req.player,
      new MazeDto(
        req.maze.xDim,
        req.maze.yDim,
        req.maze.bias,
        req.maze.nodes,
        req.maze.edges,
      ),
      req.direction,
    );
  }
}
