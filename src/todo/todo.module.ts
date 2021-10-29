import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { TodoDbController } from './todo-db/todo-db.controller';

@Module({
  controllers: [TodoController, TodoDbController],
  providers: [TodoService],
  imports: [TypeOrmModule.forFeature([TodoEntity])],
})
export class TodoModule {}
