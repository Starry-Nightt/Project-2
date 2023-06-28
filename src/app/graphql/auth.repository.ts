import { Injectable } from '@angular/core';
import { LoginPayload, RegisterPayload } from '@interfaces/auth-interface';
import { Apollo } from 'apollo-angular';
import { CREATE_USER, LOGIN } from './graphql.operation';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  constructor(private apollo: Apollo) {}

  login(detail: LoginPayload) {
    return this.apollo.mutate({ mutation: LOGIN, variables: detail });
  }

  register(detail: RegisterPayload) {
    return this.apollo.mutate({ mutation: CREATE_USER, variables: detail });
  }
}
