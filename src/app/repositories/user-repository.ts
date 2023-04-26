import { Injectable } from '@angular/core';
import { AppHttpClientService } from '@services/app-http-client.service';
import { StorageService } from '@services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(
    private http: AppHttpClientService,
    private storage: StorageService
  ) {}

  login(detail: any): Observable<any> {
    return this.http.post('/auth/login', detail);
  }

  refreshToken(): Observable<any> {
    return this.http.post('/auth/token', {
      token: this.storage.get('refresh_token'),
    });
  }

  logout(): Observable<any> {
    return this.http.delete('/auth/logout', {
      token: this.storage.get('refresh_token'),
    });
  }

  register(detail: any): Observable<any> {
    return this.http.post('/auth/register', detail);
  }

  getAllUser(): Observable<any> {
    return this.http.get('/user');
  }

  userInfo(token: any): Observable<any> {
    return this.http.post('/auth/me', { token });
  }
}
