import { Controller, Get } from '@nestjs/common';

@Controller('second')
export class SecondController {
    @Get()
    iam(): string {
        return 'je suis le second Controller';
    }
}
