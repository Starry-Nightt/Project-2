import { Observable, catchError, tap, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@services/alert.service';

interface HttpException {
  code: string;
  message: string;
}

class UndefinedException implements HttpException {
  code = '400';
  message = 'Undefined';
}

class UnauthenticatedException implements HttpException {
  code = '401';
  message = 'Unauthenticated';
}

class UnauthorizedException implements HttpException {
  code = '403';
  message = 'Unauthorized';
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public alertService: AlertService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((res: HttpResponse<any>) => {
        if (res instanceof HttpErrorResponse) return;
        if (res?.body?.message) {
          this.alertService.showMessage(res?.body.message);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err?.error?.message)
          this.alertService.showMessage(err?.error?.message);

        if (err.status === 401) {
          return throwError(() => new UnauthenticatedException());
        }
        if (err.status === 403) {
          return throwError(() => new UnauthorizedException());
        }
        return throwError(() => new UndefinedException());
      })
    );
  }
}
