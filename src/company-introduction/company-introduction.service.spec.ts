import { Test, TestingModule } from '@nestjs/testing';
import { CompanyIntroductionService } from './company-introduction.service';

describe('CompanyIntroductionService', () => {
  let service: CompanyIntroductionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyIntroductionService],
    }).compile();

    service = module.get<CompanyIntroductionService>(CompanyIntroductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
