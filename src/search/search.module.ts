import { Module } from '@nestjs/common';
import { SearchService } from './search.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SearchService],
})
export class SearchModule {}
