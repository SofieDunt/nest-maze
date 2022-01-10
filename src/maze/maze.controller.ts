import { Body, Controller, Get } from '@nestjs/common';
import { MazeDto, GetMazeDto } from '../dto';
import { MazeService } from './maze.service';

@Controller('maze')
export class MazeController {
  constructor(private readonly mazeService: MazeService) {}

  @Get()
  async get(@Body() req: GetMazeDto): Promise<MazeDto> {
    return await this.mazeService.construct(req.xDim, req.yDim, req.bias);
  }
}
