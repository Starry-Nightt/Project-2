import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { ROLE } from '@constants/enum';
import { User } from '@models/user.model';
import { UserRepository } from '@repositories/user-repository';
import { ComponentService } from '@services/component.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent extends BaseComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'username',
    'email',
    'gender',
    'birthday',
    'status',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(service: ComponentService, private repository: UserRepository) {
    super(service);
  }

  ngOnInit() {
    this.fetchTeacher();
  }

  fetchTeacher() {
    this.repository.getUserByRole(ROLE.STUDENT).subscribe((res) => {
      this.dataSource = new MatTableDataSource<User>(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
