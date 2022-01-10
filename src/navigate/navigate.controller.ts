import { Body, Controller, Get } from '@nestjs/common';
import { NavigateService } from './navigate.service';
import { GetMoveDto, PosnDto } from '../dto';

@Controller('navigate')
export class NavigateController {
  constructor(private readonly navigateService: NavigateService) {}

  @Get('move')
  move(@Body() req: GetMoveDto): PosnDto {
    return this.navigateService.move(req.player, req.maze, req.direction);
  }
}
