import { Injectable } from '@angular/core';
import {
  CreateUserPayload,
  UpdateUserPayload,
} from '@interfaces/user-interface';
import { Apollo } from 'apollo-angular';
import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_STUDENT,
  GET_ALL_TEACHER,
  GET_ALL_USER,
  GET_USER,
  UPDATE_USER,
} from './graphql.operation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(private apollo: Apollo) {}

  createUser(detail: CreateUserPayload): Observable<any> {
    return this.apollo.mutate({ mutation: CREATE_USER, variables: detail });
  }

  getAllUser(): Observable<any> {
    return this.apollo.query({ query: GET_ALL_USER });
  }

  getUserById(id: number): Observable<any> {
    return this.apollo.watchQuery({ query: GET_USER, variables: { id } })
      .valueChanges;
  }

  updateUser(id: number, detail: UpdateUserPayload): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: { id, detail },
      refetchQueries: [GET_ALL_STUDENT, GET_ALL_TEACHER],
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: { id },
      refetchQueries: [GET_ALL_STUDENT, GET_ALL_TEACHER],
    });
  }

  getAllTeacher(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_ALL_TEACHER }).valueChanges;
  }

  getAllStudent(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_ALL_STUDENT }).valueChanges;
  }
}
