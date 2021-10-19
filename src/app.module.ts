import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import prodConfiguration from './config/prod.configuration';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';
import { TodoModule } from './todo/todo.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
