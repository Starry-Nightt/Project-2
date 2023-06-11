import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { User } from '@models/user.model';
import { ComponentService } from '@services/component.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    service: ComponentService,
    private repository: TeacherRepository
  ) {
    super(service);
  }

  ngOnInit() {
    this.getAllTeacher();
  }

  getAllTeacher() {
    this.repository.getAllTeacher().subscribe((res) => {
      this.dataSource = new MatTableDataSource<User>(res.data);
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
      this.repository.updateTeacher(id, { status: !status }).subscribe(() => {
        this.getAllTeacher();
      });
    });
  }

  onDeleteTeacher(id: number) {
    this.confirm(
      'Bạn có chắc chắn muốn xóa giáo viên này',
      'Xác nhận xóa tài khoản',
      () => {
        this.repository.deleteTeacher(id).subscribe(() => {
          this.getAllTeacher();
        });
      }
    );
  }
}
