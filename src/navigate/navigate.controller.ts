import { Body, Controller, Get } from '@nestjs/common';
import { NavigateService } from './navigate.service';
import { MoveRequest } from '../types/requests';
import Posn from '../types/posn';

@Controller('navigate')
export class NavigateController {
  constructor(private readonly navigateService: NavigateService) {}

  @Get('move')
  move(@Body() req: MoveRequest): Posn {
    return this.navigateService.move(req.player, req.maze, req.direction);
  }
}
