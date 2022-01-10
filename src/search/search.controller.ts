import { Body, Controller, Get } from '@nestjs/common';
import { GetSearchDto, SearchDto } from '../dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Body() req: GetSearchDto): SearchDto {
    return this.searchService.search(
      req.maze,
      req.type,
      req.source,
      req.target,
    );
  }
}
