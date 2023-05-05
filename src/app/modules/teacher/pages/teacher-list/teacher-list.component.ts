import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { ROLE } from '@constants/enum';
import { User } from '@models/user.model';
import { UserRepository } from '@repositories/user-repository';
import { ComponentService } from '@services/component.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent extends BaseComponent implements OnInit {
  dataSource: User[] = [];
  displayedColumns: string[] = [
    'username',
    'email',
    'gender',
    'birthday',
    'status',
    'action',
  ];

  constructor(service: ComponentService, private repository: UserRepository) {
    super(service);
  }

  ngOnInit() {
    this.fetchTeacher();
  }

  fetchTeacher() {
    this.repository.getUserByRole(ROLE.TEACHER).subscribe((res) => {
      this.dataSource = [];
    });
  }
}
