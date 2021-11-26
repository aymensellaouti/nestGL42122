import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';

export enum UserRoleEnum {
  admin = 'admin',
  user = 'user',
}

@Entity('user')
export class User extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
/*   @Column()
  salt: string; */
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.user,
  })
  role: UserRoleEnum;
  @OneToMany((targetEntity) => Cv, (cv) => cv.user, {})
  cvs: Cv[];
}
