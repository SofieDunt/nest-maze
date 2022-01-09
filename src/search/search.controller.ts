import { Body, Controller, Get } from '@nestjs/common';
import { SearchRequest } from '../types/requests';
import { SearchService } from './search.service';
import { SearchResult } from '../types/searchResult';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Body() req: SearchRequest): SearchResult {
    return this.searchService.search(
      req.maze,
      req.type,
      req.source,
      req.target,
    );
  }
}
