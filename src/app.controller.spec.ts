import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConstructorService } from './constructor/constructor.service';
import { SearchService } from './search/search.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ConstructorService, SearchService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return something', () => {
      expect(appController.getMazeGame(1, 1, 1, 1, 1)).toBeDefined();
    });
  });
});
