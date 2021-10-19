import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as request from 'supertest';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    console.log('request', request.ip);
    const inDate = Date.now();
    return next.handle().pipe(
      tap((data) => {
        console.log('Duration', Date.now() - inDate);
      }),
    );
  }
}
