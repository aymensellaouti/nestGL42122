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
import { TodoModel } from './todo.model';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoDto } from './dto/addTodo.dto';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { CustomFilterFilter } from '../filters/custom-filter.filter';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'todo',
  version: '1',
})
export class TodoController {
  constructor(
    private todoService: TodoService,
    private configService: ConfigService,
  ) {}
  @Get()
  getTodos(@Req() request): TodoModel[] {
    console.log(this.configService.get<string>('database.host'));

    return this.todoService.getFakeTodos();
  }

  @Post()
  addTodo(@Body() addTodoDto: AddTodoDto): TodoModel {
    return this.todoService.addTodo(addTodoDto);
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
