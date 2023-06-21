import { Observable, catchError, of, tap, throwError } from 'rxjs';
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
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface HttpException {
  code: string;
  message: string;
}

class UndefinedException implements HttpException {
  code = '404';
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
  constructor(
    public alertService: AlertService,
    private route: Router,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((res: HttpResponse<any>) => {
        if (res?.body?.errors) {
          this.alertService.showMessage(
            res?.body?.errors[0]?.extensions?.exception?.message
          );
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return of(null);
      })
    );
  }
}
