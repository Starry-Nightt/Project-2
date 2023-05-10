import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '@bases/base/base.component';
import { User } from '@models/user.model';
import { StudentRepository } from '@repositories/student-repository';
import { UserRepository } from '@repositories/user-repository';
import { ComponentService } from '@services/component.service';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    service: ComponentService,
    private repository: StudentRepository,
    private userRepository: UserRepository
  ) {
    super(service);
  }

  ngOnInit() {
    this.getAllStudent();
  }

  getAllStudent() {
    this.repository.getAllStudent().subscribe((res) => {
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
      this.userRepository.updateUser(id, { status: !status }).subscribe(() => {
        this.getAllStudent();
      });
    });
  }

  onDeleteStudent(id: number) {
    this.confirm(
      'Bạn có chắc chắn muốn xóa học sinh này',
      'Xác nhận xóa tài khoản',
      () => {
        this.repository.deleteStudent(id).subscribe(() => {
          this.getAllStudent();
        });
      }
    );
  }
}
