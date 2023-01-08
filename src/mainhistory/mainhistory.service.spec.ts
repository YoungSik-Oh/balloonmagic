import { Test, TestingModule } from '@nestjs/testing';
import { MainhistoryService } from './mainhistory.service';

describe('MainhistoryService', () => {
  let service: MainhistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainhistoryService],
    }).compile();

    service = module.get<MainhistoryService>(MainhistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
