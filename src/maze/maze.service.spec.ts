import { Test, TestingModule } from '@nestjs/testing';
import { MazeService } from './maze.service';

describe('MazeService', () => {
  let service: MazeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MazeService],
    }).compile();

    service = module.get<MazeService>(MazeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
