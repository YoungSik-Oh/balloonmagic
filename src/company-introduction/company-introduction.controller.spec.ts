import { Test, TestingModule } from '@nestjs/testing';
import { CompanyIntroductionController } from './company-introduction.controller';

describe('CompanyIntroductionController', () => {
  let controller: CompanyIntroductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyIntroductionController],
    }).compile();

    controller = module.get<CompanyIntroductionController>(CompanyIntroductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
