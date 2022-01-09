import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Maze from './types/maze';
import { GetMazeRequest } from './types/requests';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('maze')
  getMaze(@Body() req: GetMazeRequest): Maze {
    return this.appService.getMaze(req.xDim, req.yDim, req.bias);
  }
}
