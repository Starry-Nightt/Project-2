import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '@bases/base/base.component';
import { User } from '@models/user.model';
import { ComponentService } from '@services/component.service';
import { ROLE, STATUS } from '@constants/enum';
import { UserRepository } from '@graphql/user.repository';

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

  constructor(service: ComponentService, private repository: UserRepository) {
    super(service);
  }

  ngOnInit() {
    this.getAllStudent();
  }

  getAllStudent() {
    this.repository.getAllStudent().subscribe((res) => {
      this.studentList = res.data.students;
      this.dataSource = new MatTableDataSource<User>(this.studentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
      if (status)
        this.repository.updateUser(id, { status: STATUS.INACTIVE }).subscribe();
      else
        this.repository.updateUser(id, { status: STATUS.ACTIVE }).subscribe();
    });
  }

  onDeleteStudent(id: number) {
    this.confirm(
      'Bạn có chắc chắn muốn xóa học sinh này',
      'Xác nhận xóa tài khoản',
      () => {
        this.repository.deleteUser(id).subscribe();
      }
    );
  }

  onViewDetail(id: number) {
    this.redirect(['/manage/profile'], { id });
  }
}
