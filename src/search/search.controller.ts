import { Body, Controller, Post } from '@nestjs/common';
import { GetPathDto, KeyValDto, MapMapper } from '../dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/reconstruct-path')
  async reconstructPath(@Body() req: GetPathDto): Promise<KeyValDto[]> {
    return await this.searchService.reconstructPath(
      MapMapper.mapKeyVals(req.parents),
      req.source,
      req.target,
    );
  }
}
