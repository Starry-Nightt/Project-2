import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_ALL_TEACHER } from './graphql.operation';

@Injectable({
  providedIn: 'root',
})
export class TeacherRepository {
  constructor(private apollo: Apollo, private storage: StorageService) {}

  getAllTeacher(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_ALL_TEACHER }).valueChanges;
  }
}
