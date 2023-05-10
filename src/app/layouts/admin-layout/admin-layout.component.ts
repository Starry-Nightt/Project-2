import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  menu = [
    {
      icon: 'event_note',
      path: '',
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
      path: '',
      viewValue: 'Lớp học',
    },
    {
      icon: 'spa',
      path: '',
      viewValue: 'Môn học',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
