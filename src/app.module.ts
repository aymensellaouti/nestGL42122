import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import prodConfiguration from './config/prod.configuration';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './todo/entities/todo.entity';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    FirstModule,
    SecondModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        process.env.NODE_ENV == 'development'
          ? configuration
          : prodConfiguration,
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gl42021',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
    MulterModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
