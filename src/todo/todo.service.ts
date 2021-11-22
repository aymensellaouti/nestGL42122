import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from './todo.model';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { Repository, UpdateResult } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { filterByDate } from '../generics/db/date-filter';
import { DateIntervalDto } from './dto/date-interval.dto';

@Injectable()
export class TodoService {
  private todos: TodoModel[] = [];
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {
    this.todos = [
      new TodoModel(uuidv4(), 'todo1', 'my todo 1'),
      new TodoModel(uuidv4(), 'todo2', 'my todo 2'),
    ];
  }
  getTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  addDbTodo(addTodo: AddTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(addTodo);
  }
  getTodoDb(id: number): Promise<TodoEntity> {
    return this.todoRepository.findOne(id);
  }
  async updateDBTodo(
    updateTodo: UpdateTodoDto,
    id: number,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({
      id,
      ...updateTodo,
    });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    }
    throw new NotFoundException('Todo innexistant');
  }
  softDelete(id: number): Promise<UpdateResult> {
    return this.todoRepository.softDelete(id);
  }
  restore(id: number): Promise<UpdateResult> {
    return this.todoRepository.restore(id);
  }
  getFakeTodos(): TodoModel[] {
    return this.todos;
  }

  addTodo(addTodo: AddTodoDto): TodoModel {
    const { name, description } = addTodo;
    const newTodo = new TodoModel(uuidv4(), name, description);
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodo(id: string): TodoModel {
    return this.getTodoById(id);
  }

  deleteTodo(id: string): { count: number } {
    const oldTodosLength = this.todos.length;
    this.todos = this.todos.filter((actualTodo) => actualTodo.id !== id);
    if (this.todos.length === oldTodosLength) {
      throw new NotFoundException('Todo inexistant');
    }
    return { count: oldTodosLength - this.todos.length };
  }
  updateTodo(addTodo: UpdateTodoDto, id: string): TodoModel {
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

  getTodoByIntervalDate(
    dateTimeInterval: DateIntervalDto,
  ): Promise<TodoEntity[]> {
    const { dateMin, dateMax } = dateTimeInterval;
    const qb = this.todoRepository.createQueryBuilder();
    console.log(qb);
    filterByDate(qb, 'created_at', dateMin, dateMax);
    console.log(qb);
    return qb.getMany();
  }
}
