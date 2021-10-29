import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseFilters,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoDto } from '../dto/addTodo.dto';
import { UpdateTodoDto } from '../dto/updateTodo.dto';
import { TodoModel } from '../todo.model';
import { TodoService } from '../todo.service';
import { TodoEntity } from '../entities/todo.entity';

@Controller({
  path: 'todo',
  version: '2',
})
export class TodoDbController {
  constructor(
    private todoService: TodoService,
    private configService: ConfigService,
  ) {}
  @Get()
  getTodos(@Req() request): string {
    return 'cc';
  }

  @Post()
  addTodo(@Body() addTodoDto: AddTodoDto): Promise<TodoEntity> {
    return this.todoService.addDbTodo(addTodoDto);
  }

  @Get(':id')
  getTodo(@Param('id') id: string): TodoModel {
    return this.todoService.getTodoById(id);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): { count: number } {
    return this.deleteTodo(id);
  }
  @Patch(':id')
  updateTodo(
    @Body() addTodo: UpdateTodoDto,
    @Param('id') id: string,
  ): TodoModel {
    return this.todoService.updateTodo(addTodo, id);
  }
}
