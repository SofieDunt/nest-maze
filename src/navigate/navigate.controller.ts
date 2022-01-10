import { Body, Controller, Get } from '@nestjs/common';
import { NavigateService } from './navigate.service';
import { GetMoveDto, PlayerDto } from '../dto';

@Controller('navigate')
export class NavigateController {
  constructor(private readonly navigateService: NavigateService) {}

  @Get('move')
  move(@Body() req: GetMoveDto): PlayerDto {
    return this.navigateService.move(req.player, req.maze, req.direction);
  }
}
