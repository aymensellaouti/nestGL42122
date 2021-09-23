import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}

  @Get('hello/:name')
  getHello(
    @Param('name') name: string
  ): string {
    return `Cc ${name}`;
  }
}
