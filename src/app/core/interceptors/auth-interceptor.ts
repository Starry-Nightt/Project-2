import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.storage.get('access_token');
    if (!authToken) return next.handle(req);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    return next.handle(authReq);
  }
}
