import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_ALL_STUDENT, UPDATE_STUDENT } from './graphql.operation';
import { GENDER } from '@constants/enum';

@Injectable({
  providedIn: 'root',
})
export class StudentRepository {
  constructor(private apollo: Apollo, private storage: StorageService) {}

  getAllStudent(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_ALL_STUDENT }).valueChanges;
  }

  updateStudent(detail: {
    firstName?: String;
    lastName?: String;
    gender?: GENDER;
  }): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_STUDENT,
      variables: { info: detail },
    });
  }
}
