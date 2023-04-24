import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppHttpClientService {
  prefix: string = 'http://localhost:4000';
  constructor(private httpClient: HttpClient, public storage: StorageService) {}

  public get<T>(uri: string, params = {}): Observable<T> {
    const queryString = '?' + new URLSearchParams(params).toString();
    return this.httpClient.get<T>(this.prefix + uri + queryString);
  }

  public post<T>(uri: string, params = {}): Observable<T> {
    return this.httpClient.post<T>(this.prefix + uri, params);
  }

  public put<T>(uri: string, params: object = {}): Observable<T> {
    return this.httpClient.put<T>(this.prefix + uri, params);
  }

  public delete<T>(uri: string, params: object = {}): Observable<T> {
    return this.httpClient.delete<T>(this.prefix + uri, {
      body: params,
    });
  }
}
