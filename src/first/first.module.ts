import { Module } from "@nestjs/common";
import { FirstController } from "./first.controller";

@Module({
    controllers: [FirstController]
})
export class FirstModule {}