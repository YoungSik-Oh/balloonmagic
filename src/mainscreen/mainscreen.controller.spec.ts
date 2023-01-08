import { Test, TestingModule } from '@nestjs/testing';
import { MainscreenController } from './mainscreen.controller';

describe('MainscreenController', () => {
  let controller: MainscreenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainscreenController],
    }).compile();

    controller = module.get<MainscreenController>(MainscreenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
