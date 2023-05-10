import { Injectable } from '@angular/core';
import { AppHttpClientService } from '@services/app-http-client.service';
import { StorageService } from '@services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentRepository {
  constructor(
    private http: AppHttpClientService,
    private storage: StorageService
  ) {}

  getAllStudent(): Observable<any> {
    return this.http.get('/student');
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`/student/${id}`);
  }

  createStudent(detail: any): Observable<any> {
    return this.http.post('/student', detail);
  }

  updateStudent(id: number, detail: any): Observable<any> {
    return this.http.put(`/student/${id}`, detail);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`/student/${id}`);
  }
}
