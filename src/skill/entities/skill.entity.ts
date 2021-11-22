
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';

@Entity('skill')
export class Skill extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  designation: string;

  @ManyToMany(() => Cv, (cv) => cv.skills)
  cvs: Cv[];
}
