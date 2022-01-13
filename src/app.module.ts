import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConstructorModule } from './constructor/constructor.module';
import { SearchModule } from './search/search.module';
import { ConstructorService } from './constructor/constructor.service';
import { SearchService } from './search/search.service';

@Module({
  imports: [ConstructorModule, SearchModule],
  controllers: [AppController],
  providers: [ConstructorService, SearchService],
})
export class AppModule {}
