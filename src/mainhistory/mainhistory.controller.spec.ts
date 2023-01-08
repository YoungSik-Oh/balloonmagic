import { Test, TestingModule } from '@nestjs/testing';
import { MainhistoryController } from './mainhistory.controller';

describe('MainhistoryController', () => {
  let controller: MainhistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainhistoryController],
    }).compile();

    controller = module.get<MainhistoryController>(MainhistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
