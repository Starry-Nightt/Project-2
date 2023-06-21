import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { UPDATE_ADMIN } from './graphql.operation';
import { GENDER } from '@constants/enum';

@Injectable({
  providedIn: 'root',
})
export class AdminRepository {
  constructor(private apollo: Apollo, private storage: StorageService) {}

  updateAdmin(detail: {
    firstName?: String;
    lastName?: String;
    gender?: GENDER;
  }): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_ADMIN,
      variables: { info: detail },
    });
  }
}
