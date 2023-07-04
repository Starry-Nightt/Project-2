import { Injectable } from '@angular/core';
import {
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
} from '@interfaces/auth-interface';
import { Apollo } from 'apollo-angular';
import { CHANGE_PASSWORD, CREATE_USER, LOGIN } from './graphql.operation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  constructor(private apollo: Apollo) {}

  login(detail: LoginPayload): Observable<any> {
    return this.apollo.mutate({ mutation: LOGIN, variables: detail });
  }

  register(detail: RegisterPayload): Observable<any> {
    return this.apollo.mutate({ mutation: CREATE_USER, variables: detail });
  }

  changePassword(detail: ChangePasswordPayload): Observable<any> {
    return this.apollo.mutate({ mutation: CHANGE_PASSWORD, variables: detail });
  }
}
