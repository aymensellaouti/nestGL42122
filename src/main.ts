import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { CustomFilterFilter } from './filters/custom-filter.filter';
import { DurationInterceptor } from './interceptors/duration.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  console.log(process.env.SECRET);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:4200/',
  });
  app.useGlobalInterceptors(new DurationInterceptor());
  /*   app.useGlobalFilters(new CustomFilterFilter());
   */ /*   app.use((req: Request, res: Response, next) => {
    if (req.url.includes('ca')) {
      res.json({
        name: 'aymen',
        content: 'you will always get his response',
      });
      return res;
    }
    next();
  });
 */ app.use(morgan('dev'));
  await app.listen(3000);
}
bootstrap();
