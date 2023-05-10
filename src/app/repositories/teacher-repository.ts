import { Injectable } from '@angular/core';
import { AppHttpClientService } from '@services/app-http-client.service';
import { StorageService } from '@services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherRepository {
  constructor(
    private http: AppHttpClientService,
    private storage: StorageService
  ) {}

  getAllTeacher(): Observable<any> {
    return this.http.get('/teacher');
  }

  getTeacherById(id: number): Observable<any> {
    return this.http.get(`/teacher/${id}`);
  }

  createTeacher(detail: any): Observable<any> {
    return this.http.post('/teacher', detail);
  }

  updateTeacher(id: number, detail: any): Observable<any> {
    return this.http.put(`/teacher/${id}`, detail);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`/teacher/${id}`);
  }
}
