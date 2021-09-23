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
} from '@nestjs/common';
import { TodoModel } from './todo.model';
import { v4 as uuidv4 } from 'uuid';
@Controller('todo')
export class TodoController {
  private todos: TodoModel[];
  constructor() {
    this.todos = [
      new TodoModel(uuidv4(), 'todo1', 'my todo 1'),
      new TodoModel(uuidv4(), 'todo2', 'my todo 2'),
    ];
  }
  @Get()
  getTodos(@Req() request): TodoModel[] {
    console.log(request);
    return this.todos;
  }

  @Post()
  addTodo(@Body() addTodo: Partial<TodoModel>): TodoModel {
    console.log(addTodo);
    const { name, description } = addTodo;
    const newTodo = new TodoModel(uuidv4(), name, description);
    this.todos.push(newTodo);
    return newTodo;
  }
  //Todo Get Todo By id
  @Get(':id')
  getTodo(@Param('id') id: string): TodoModel {
    return this.getTodoById(id);
  }
  //Todo Delete Todo By id
  @Delete(':id')
  deleteTodo(@Param('id') id: string): { count: number } {
    const oldTodosLength = this.todos.length;
    this.todos = this.todos.filter((actualTodo) => actualTodo.id !== id);
    if (this.todos.length === oldTodosLength) {
      throw new NotFoundException('Todo inexistant');
    }
    return { count: oldTodosLength - this.todos.length };
  }
  //Todo update Todo
  @Patch(':id')
  updateTodo(
    @Body() addTodo: Partial<TodoModel>,
    @Param('id') id: string,
  ): TodoModel {
    console.log(addTodo);
    const updatedTodo = this.getTodoById(id);
    const { name, description, status } = addTodo;
    updatedTodo.name = name ?? updatedTodo.name;
    updatedTodo.description = description ?? updatedTodo.description;
    updatedTodo.status = status ?? updatedTodo.status;
    return updatedTodo;
  }

  getTodoById(id: string): TodoModel {
    const todo = this.todos.find((actualTodo) => actualTodo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo inexistant');
    }
    return todo;
  }
}
