import { Module } from '@nestjs/common';
import { MazeController } from './maze.controller';
import { MazeService } from './maze.service';

@Module({
  controllers: [MazeController],
  providers: [MazeService],
})
export class MazeModule {}
