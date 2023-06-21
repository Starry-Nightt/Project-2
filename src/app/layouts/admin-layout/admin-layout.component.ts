import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { ComponentService } from '@services/component.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent extends BaseComponent implements OnInit {
  menu = [
    {
      icon: 'event_note',
      path: 'abc',
      viewValue: 'Khóa học',
    },
    {
      icon: 'people',
      path: 'teacher',
      viewValue: 'Giáo viên',
    },
    {
      icon: 'people_outline',
      path: 'student',
      viewValue: 'Học sinh',
    },
    {
      icon: 'school',
      path: 'cde',
      viewValue: 'Lớp học',
    },
    {
      icon: 'spa',
      path: 'def',
      viewValue: 'Môn học',
    },
  ];

  constructor(service: ComponentService) {
    super(service);
  }

  ngOnInit() {}

  onNavigateHome() {
    this.redirect('/manage');
  }
}
