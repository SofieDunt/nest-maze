import { Body, Controller, Post } from '@nestjs/common';
import {
  GetPathDto,
  GetSearchDto,
  KeyValDto,
  MapMapper,
  SearchDto,
} from '../dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  search(@Body() req: GetSearchDto): SearchDto {
    return this.searchService.search(
      req.maze,
      req.type,
      req.source,
      req.target,
    );
  }

  @Post('/reconstruct-path')
  reconstructPath(@Body() req: GetPathDto): KeyValDto[] {
    return SearchService.reconstructPath(
      MapMapper.mapKeyVals(req.parents),
      req.target,
    );
  }
}
