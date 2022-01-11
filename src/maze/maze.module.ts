import { Module } from '@nestjs/common';
import { MazeService } from './maze.service';

@Module({
  controllers: [],
  providers: [MazeService],
})
export class MazeModule {}
