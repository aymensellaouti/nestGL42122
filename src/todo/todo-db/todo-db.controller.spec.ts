import { Test, TestingModule } from '@nestjs/testing';
import { TodoDbController } from './todo-db.controller';

describe('TodoDbController', () => {
  let controller: TodoDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoDbController],
    }).compile();

    controller = module.get<TodoDbController>(TodoDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
