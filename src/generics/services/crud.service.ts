import { Repository, UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class CrudService<Entity> {
  constructor(private repository: Repository<Entity>) {}

  findAll(options): Promise<Entity[]> {
    return this.repository.find();
  }
  create(addTodo): Promise<Entity> {
    return this.repository.save(addTodo);
  }
  findOne(id: number): Promise<Entity> {
    return this.repository.findOne(id);
  }
  async update(id: number, updateTodo): Promise<Entity> {
    const newTodo = await this.repository.preload({
      id,
      ...updateTodo,
    });
    if (newTodo) {
      return this.repository.save(newTodo);
    }
    throw new NotFoundException('Todo innexistant');
  }
  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
  restore(id: number): Promise<UpdateResult> {
    return this.repository.restore(id);
  }
}
