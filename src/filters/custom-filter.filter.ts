import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomFilterFilter<HttpException> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('in exception filter', exception);
    const response: Response = host.switchToHttp().getResponse<Response>();
    console.log('response', response.json);
    response.json({ message: 'erreur' });

    return response;
  }
}
