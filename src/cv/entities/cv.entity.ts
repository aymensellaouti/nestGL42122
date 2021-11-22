import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';

@Entity('cv')
export class Cv extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  name: string;
  @Column({
    length: 50,
  })
  firstname: string;
  @Column({
    length: 50,
  })
  job: string;
  @Column({
    length: 50,
  })
  path: string;
  @Column({
    length: 50,
  })
  cin: string;
  @Column()
  age: number;
  @ManyToOne((targetTarget) => User, (user) => user.cvs, {})
  user: User;

  @ManyToMany(() => Skill, (skill) => skill.cvs, {})
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
}
