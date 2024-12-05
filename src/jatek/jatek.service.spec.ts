import { Test, TestingModule } from '@nestjs/testing';
import { JatekService } from './jatek.service';

describe('JatekokService', () => {
  let service: JatekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JatekService],
    }).compile();

    service = module.get<JatekService>(JatekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
