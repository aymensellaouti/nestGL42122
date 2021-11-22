import { Injectable } from '@nestjs/common';
import { CrudService } from '../generics/services/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvService extends CrudService<Cv> {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }
}
