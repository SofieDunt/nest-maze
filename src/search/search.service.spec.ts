import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', async () => {
    const p = new Map<number, number>();
    p.set(5, 4);
    p.set(4, 3);
    p.set(3, 2);
    p.set(2, 1);
    p.set(1, 1);
    const path = await service.reconstructPath(p, 1, 5);
    expect(path.length).toEqual(5);
  });
});
