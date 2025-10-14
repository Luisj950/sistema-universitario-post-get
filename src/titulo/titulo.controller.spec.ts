import { Test, TestingModule } from '@nestjs/testing';
import { TituloController } from './titulo.controller';
import { TituloService } from './titulo.service';

describe('TituloController', () => {
  let controller: TituloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TituloController],
      providers: [TituloService],
    }).compile();

    controller = module.get<TituloController>(TituloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
