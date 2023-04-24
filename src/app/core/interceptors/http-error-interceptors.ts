import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from '@services/dialog.service';

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
  constructor(public dialogService: DialogService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.dialogService.warning('Bạn chưa đăng nhập.');
          return throwError(() => new UnauthenticatedException());
        }
        if (err.status === 403) {
          this.dialogService.warning('Bạn không có quyền truy cập.');
          return throwError(() => new UnauthorizedException());
        }

        return throwError(() => new UndefinedException());
      })
    );
  }
}
