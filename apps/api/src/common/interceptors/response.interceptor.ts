import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PaginatedResponse } from '@mezon-tutors/shared';

const RAW_AUTH_PATHS = ['/api/auth/url', '/api/auth/mezon/exchange', '/api/auth/me'];

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T> | PaginatedResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T> | PaginatedResponse<T>> {
    const request = context.switchToHttp().getRequest<{ originalUrl?: string; url?: string; path?: string }>();
    const path = request?.originalUrl ?? request?.url ?? request?.path ?? '';

    const skipWrap = RAW_AUTH_PATHS.some((p) => path.startsWith(p) || path.endsWith(p));

    return next.handle().pipe(
      map((data) => {
        if (skipWrap) return data as ApiResponse<T> | PaginatedResponse<T>;
        return {
          data,
          error: null,
        };
      })
    );
  }
}
