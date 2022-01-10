import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MazeModule } from './maze/maze.module';
import { NavigateModule } from './navigate/navigate.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [MazeModule, NavigateModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
