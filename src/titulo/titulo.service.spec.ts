import { Test, TestingModule } from '@nestjs/testing';
import { TituloService } from './titulo.service';

describe('TituloService', () => {
  let service: TituloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TituloService],
    }).compile();

    service = module.get<TituloService>(TituloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
