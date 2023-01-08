import { Test, TestingModule } from '@nestjs/testing';
import { MainscreenService } from './mainscreen.service';

describe('MainscreenService', () => {
  let service: MainscreenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainscreenService],
    }).compile();

    service = module.get<MainscreenService>(MainscreenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
