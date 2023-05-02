import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { ROLE } from '@constants/enum';
import { User } from '@models/user.model';
import { UserRepository } from '@repositories/user-repository';
import { ComponentService } from '@services/component.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent extends BaseComponent implements OnInit {
  teachers: User[] = [];
  displayedColumns: string[] = [
    'position',
    'username',
    'email',
    'gender',
    'birthday',
    'status',
    'action',
  ];
  dataSource: any;

  constructor(service: ComponentService, private repository: UserRepository) {
    super(service);
  }

  ngOnInit() {
    this.fetchTeacher();
  }

  fetchTeacher() {
    this.repository.getUserByRole(ROLE.TEACHER).subscribe((res) => {
      this.teachers = res.data;
      this.dataSource = new MatTableDataSource(this.teachers);
    });
  }
}
