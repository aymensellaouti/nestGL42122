import { Module } from '@nestjs/common';
import { SecondController } from './second.controller';

@Module({
  controllers: [SecondController]
})
export class SecondModule {}
