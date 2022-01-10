import { Test, TestingModule } from '@nestjs/testing';
import { MazeController } from './maze.controller';

describe('MazeController', () => {
  let controller: MazeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MazeController],
    }).compile();

    controller = module.get<MazeController>(MazeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
