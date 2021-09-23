import { Test, TestingModule } from '@nestjs/testing';
import { SecondController } from './second.controller';

describe('SecondController', () => {
  let controller: SecondController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecondController],
    }).compile();

    controller = module.get<SecondController>(SecondController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
