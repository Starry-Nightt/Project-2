import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { ComponentService } from '@services/component.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-student-teacher-header',
  templateUrl: './student-teacher-header.component.html',
  styleUrls: ['./student-teacher-header.component.scss'],
})
export class StudentTeacherHeaderComponent
  extends BaseComponent
  implements OnInit
{
  menu = [
    {
      icon: 'school',
      path: '',
      viewValue: 'Lớp học',
      canDisplay: true,
    },
    {
      icon: 'event_note',
      path: '',
      viewValue: 'Thời khóa biểu',
      canDisplay: true,
    },
    {
      icon: 'class',
      path: '',
      viewValue: 'Đăng ký khóa học',
      canDisplay: this.isStudent,
    },
  ];

  constructor(service: ComponentService, public profile: ProfileService) {
    super(service);
  }

  get isStudent() {
    return this.profile.isStudent;
  }

  get isTeacher() {
    return this.profile.isTeacher;
  }

  ngOnInit() {}

  onNavigateHome() {
    this.redirect('/use');
  }
}
