import { Injectable } from '@angular/core';
import { ROLE } from '@constants/enum';
import { LoginDetail, RegisterDetail } from '@interfaces/auth-interface';
import { User } from '@models/user.model';
import { AppHttpClientService } from '@services/app-http-client.service';
import { StorageService } from '@services/storage.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  ACTIVE,
  DELETE_ACCOUNT,
  GET_ALL_STUDENT,
  GET_ALL_TEACHER,
  HELLO,
  INACTIVE,
  LOGIN,
  REGISTER,
} from './graphql.operation';

@Injectable({
  providedIn: 'root',
})
export class AccountRepository {
  constructor(private apollo: Apollo, private storage: StorageService) {}

  login(detail: LoginDetail): Observable<any> {
    return this.apollo.mutate({ mutation: LOGIN, variables: detail });
  }

  register(detail: RegisterDetail): Observable<any> {
    return this.apollo.mutate({ mutation: REGISTER, variables: detail });
  }

  hello(): Observable<any> {
    return this.apollo.watchQuery({ query: HELLO }).valueChanges;
  }

  active(id: Number): Observable<any> {
    return this.apollo.mutate({
      mutation: ACTIVE,
      variables: { id },
      refetchQueries: [GET_ALL_STUDENT, GET_ALL_TEACHER],
    });
  }

  inactive(id: Number): Observable<any> {
    return this.apollo.mutate({
      mutation: INACTIVE,
      variables: { id },
      refetchQueries: [GET_ALL_STUDENT, GET_ALL_TEACHER],
    });
  }

  delete(id: Number, role: ROLE): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_ACCOUNT,
      refetchQueries: [GET_ALL_STUDENT, GET_ALL_TEACHER],
      variables: { id, role },
    });
  }
}
