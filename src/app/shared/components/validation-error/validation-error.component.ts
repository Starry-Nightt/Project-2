import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.css'],
})
export class ValidationErrorComponent implements OnInit {
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {}

  getMessage() {
    let message = '';
    if (!this.control.errors) return message;

    if (this.control.errors['required']) message = 'Giá trị này là bắt buộc.';
    if (this.control.errors['minlength']) message = 'Giá trị quá ngắn.';
    if (this.control.errors['maxlength']) message = 'Giá trị quá dài.';
    if (this.control.errors['emails']) message = 'Email không hợp lệ.';
    if (this.control.errors['pattern'])
      message = 'Định dạng của giá trị không hợp lệ.';
    return message;
  }
}
