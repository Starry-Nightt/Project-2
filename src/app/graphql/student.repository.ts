import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_ALL_STUDENT } from './graphql.operation';

@Injectable({
  providedIn: 'root',
})
export class StudentRepository {
  constructor(private apollo: Apollo, private storage: StorageService) {}

  getAllStudent(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_ALL_STUDENT }).valueChanges;
  }
}
