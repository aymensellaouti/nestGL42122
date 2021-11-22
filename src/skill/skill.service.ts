import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CrudService } from '../generics/services/crud.service';

@Injectable()
export class SkillService extends CrudService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {
    super(skillRepository);
  }
}
