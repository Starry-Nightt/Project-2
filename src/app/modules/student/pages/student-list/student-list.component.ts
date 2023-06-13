import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '@bases/base/base.component';
import { User } from '@models/user.model';
import { ComponentService } from '@services/component.service';
import { ROLE } from '@constants/enum';
import { AccountRepository } from '@graphql/account.repository';
import { StudentRepository } from '@graphql/student.repository';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent extends BaseComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'username',
    'email',
    'gender',
    'birthday',
    'status',
    'action',
  ];
  studentList: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    service: ComponentService,
    private repository: StudentRepository,
    private accountRepository: AccountRepository
  ) {
    super(service);
  }

  ngOnInit() {
    this.getAllStudent();
  }

  getAllStudent() {
    this.repository.getAllStudent().subscribe((res) => {
      this.studentList = res.data.students.map((item) =>
        this.convertData(item)
      );
      this.dataSource = new MatTableDataSource<User>(this.studentList);
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
        this.accountRepository.delete(id, ROLE.STUDENT).subscribe();
      }
    );
  }
}
