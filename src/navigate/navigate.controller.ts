import { Body, Controller, Post } from '@nestjs/common';
import { NavigateService } from './navigate.service';
import { GetMoveDto } from '../dto';

@Controller('navigate')
export class NavigateController {
  constructor(private readonly navigateService: NavigateService) {}

  @Post('move')
  move(@Body() req: GetMoveDto): number {
    return this.navigateService.move(req.player, req.maze, req.direction);
  }
}
