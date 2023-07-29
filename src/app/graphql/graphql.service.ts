import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOAD_USERS_QUERY, LoadUsersQueryResponse, iUser } from './graphql';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getUsers() {
    return this.apollo
      .query<{users: iUser[]}>({
        query: LOAD_USERS_QUERY,
      })
      .pipe(
        map((res) => {
          console.log('res', res);
          return { users: res.data?.users, loading: res.loading };
        })
      );
  }
}
