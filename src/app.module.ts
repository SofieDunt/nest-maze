import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MazeModule } from './maze/maze.module';
import { SearchModule } from './search/search.module';
import { MazeService } from './maze/maze.service';
import { SearchService } from './search/search.service';

@Module({
  imports: [MazeModule, SearchModule],
  controllers: [AppController],
  providers: [MazeService, SearchService],
})
export class AppModule {}
