import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFragmentComponent } from '@bases/form-fragment/form-fragment.component';
import { ComponentService } from '@services/component.service';
import { GENDER, ROLE, STATUS } from '@constants/enum';
import { MomentToString, StringToMoment } from '@utils/convert';
import { RegisterPayload } from '@interfaces/auth-interface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent
  extends FormFragmentComponent<RegisterPayload>
  implements OnInit
{
  genders = [
    {
      value: GENDER.MALE,
      viewValue: 'Nam',
    },
    {
      value: GENDER.FEMALE,
      viewValue: 'Nữ',
    },
  ];

  roles = [
    {
      value: ROLE.STUDENT,
      viewValue: 'Học sinh',
    },
    {
      value: ROLE.TEACHER,
      viewValue: 'Giáo viên',
    },
  ];

  override form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    gender: [null, [Validators.required]],
    birthday: ['', [Validators.required]],
    role: [null, [Validators.required]],
  });

  firstForm: FormGroup = this.fb.group({
    email: ['tien@gmail.com', [Validators.required, Validators.email]],
    password: ['123', [Validators.required]],
    role: [null, [Validators.required]],
  });

  secondForm: FormGroup = this.fb.group({
    firstName: ['dang', [Validators.required]],
    lastName: ['tien', [Validators.required]],
    gender: [null, [Validators.required]],
    birthday: ['', [Validators.required]],
  });

  constructor(service: ComponentService, private fb: FormBuilder) {
    super(service);
  }

  override onSubmit(): void {
    const formValue = { ...this.firstForm.value, ...this.secondForm.value };
    formValue.birthday = MomentToString(formValue.birthday);
    this.form.patchValue(formValue);
    super.onSubmit();
  }
}
