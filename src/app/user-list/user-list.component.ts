import { Component, OnInit } from '@angular/core';
import {
  iUser,
} from '../graphql/graphql';
import { Observable, of } from 'rxjs';
import { GraphqlService } from '../graphql/graphql.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users$: Observable<Array<iUser>> = of([]);
  loading$: Observable<boolean> = of(false);
  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    console.log('list comp');
    this.loadUsers();
  }

  getImageUrl(urlSurfix: string){
    return `http://localhost:8080/${urlSurfix}`;
  }

  loadUsers() {
    this.graphqlService.getUsers().subscribe((res) => {
      console.log(res)
      this.users$ = of(res?.users as Array<iUser>);
      this.loading$ = of(res?.loading as boolean);
    });
  }
}
