import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MazeController } from './maze/maze.controller';
import { MazeModule } from './maze/maze.module';
import { NavigateModule } from './navigate/navigate.module';
import { SearchModule } from './search/search.module';
import { NavigateController } from './navigate/navigate.controller';
import { SearchController } from './search/search.controller';

@Module({
  imports: [MazeModule, NavigateModule, SearchModule],
  controllers: [
    AppController,
    MazeController,
    NavigateController,
    SearchController,
  ],
  providers: [AppService],
})
export class AppModule {}
