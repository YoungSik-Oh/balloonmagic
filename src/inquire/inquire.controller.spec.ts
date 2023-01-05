import { Test, TestingModule } from '@nestjs/testing';
import { InquireController } from './inquire.controller';

describe('InquireController', () => {
  let controller: InquireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InquireController],
    }).compile();

    controller = module.get<InquireController>(InquireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
