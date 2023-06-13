import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { User } from '@models/user.model';
import { ComponentService } from '@services/component.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ROLE } from '@constants/enum';
import { AccountRepository } from '@graphql/account.repository';
import { TeacherRepository } from '@repositories/teacher-repository';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
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
  teacherList: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    service: ComponentService,
    private repository: TeacherRepository,
    private accountRepository: AccountRepository
  ) {
    super(service);
  }

  ngOnInit() {
    this.getAllTeacher();
  }

  getAllTeacher() {
    this.repository.getAllTeacher().subscribe((res) => {
      this.teacherList = res.data.teachers.map((item) =>
        this.convertData(item)
      );
      this.dataSource = new MatTableDataSource<User>(this.teacherList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  convertData(data): User {
    let user: User = new User();
    user.id = data?.id;
    user.firstName = data?.firstName;
    user.lastName = data?.lastName;
    user.fullName = data?.fullName;
    user.gender = data?.gender;
    user.email = data?.account?.email;
    user.status = data?.account?.status;
    user.accountId = data?.account?.id;
    return user;
  }

  onToggleStatus(id: number, status: number) {
    let message;
    let title;
    if (status) {
      message = 'Sau khi In Active, tài khoản sẽ không thế đăng nhập';
      title = 'Xác nhận ngừng kích hoạt tài khoản';
    } else
      (message = 'Sau khi Active, tài khoản có thể đăng nhập bình thường'),
        (title = 'Xác nhận kích hoạt tài khoản');
    this.confirm(message, title, () => {
      if (status) this.accountRepository.inactive(id).subscribe();
      else this.accountRepository.active(id).subscribe();
    });
  }

  onDeleteStudent(id: number) {
    this.confirm(
      'Bạn có chắc chắn muốn xóa học sinh này',
      'Xác nhận xóa tài khoản',
      () => {
        this.accountRepository.delete(id, ROLE.TEACHER).subscribe();
      }
    );
  }
}
