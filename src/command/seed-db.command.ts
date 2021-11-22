import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import * as faker from 'faker';
import { SkillService } from '../skill/skill.service';
import { Skill } from '../skill/entities/skill.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CvService } from '../cv/cv.service';
import { Cv } from '../cv/entities/cv.entity';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('in seed File');
  // application logic...

  // Todo : Seed Skill
  const skillService = app.get(SkillService);
  console.log('seeding skills');

  for (let i = 1; i < 10; i++) {
    const skill = new Skill();
    skill.designation = faker.name.jobArea();
    await skillService.create(skill);
  }
  console.log('end seeding skills');
  // Todo : Seed User
  const userService = app.get(UserService);
  console.log('seeding users');
  for (let i = 1; i < 10; i++) {
    const user = new User();
    user.email = faker.internet.email();
    user.username = faker.internet.userName();
    user.password = i % 3 == 0 ? 'admin' : 'user';
    await userService.create(user);
  }
  console.log('end seeding skills');
  // Todo : Seed Cv
  console.log('seeding cvs');
  const cvService = app.get(CvService);
  const users = await userService.findAll({});
  const skills = await skillService.findAll({});
  for (let i = 1; i < 10; i++) {
    const cv = new Cv();
    cv.name = faker.name.lastName();
    cv.firstname = faker.name.firstName();
    cv.age = faker.datatype.number(75);
    cv.cin = `cin${i}`;
    cv.job = faker.name.jobTitle();
    cv.path = 'as.jpg';
    cv.user = users[faker.datatype.number(9)];
    cv.skills = [];
    cv.skills.push(skills[1]);
    cv.skills.push(skills[3]);
    cv.skills.push(skills[5]);

    await cvService.create(cv);
  }
  console.log('end seeding cvs');
  await app.close();
}
bootstrap();
