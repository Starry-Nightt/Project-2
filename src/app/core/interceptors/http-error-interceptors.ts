import { Observable, catchError, of, tap, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@services/alert.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public alertService: AlertService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((res: HttpResponse<any>) => {
        if (res?.body?.errors) {
          const errors: any[] = res?.body?.errors;
          errors.forEach((err) => {
            this.alertService.showMessage(err?.message);
          });
        }
        if (res?.body?.data) {
          const data = res?.body?.data;
          for (let key in data) {
            if (data[key]?.message)
              this.alertService.showMessage(data[key]?.message);
          }
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
