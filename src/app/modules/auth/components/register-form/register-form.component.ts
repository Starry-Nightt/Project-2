import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFragmentComponent } from '@bases/form-fragment/form-fragment.component';
import { ComponentService } from '@services/component.service';
import { GENDER, ROLE, STATUS } from '@constants/enum';
import { RegisterDetail } from '@interfaces/auth-interface';
import { MomentToString, StringToMoment } from '@utils/convert';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent
  extends FormFragmentComponent<RegisterDetail>
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
    // status: [STATUS.INACTIVE, [Validators.required]],
    // birthday: ['', [Validators.required]],
    role: [null, [Validators.required]],
  });

  firstForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: [null, [Validators.required]],
  });

  secondForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    gender: [null, [Validators.required]],
    // birthday: ['', [Validators.required]],
  });

  constructor(service: ComponentService, private fb: FormBuilder) {
    super(service);
  }

  override onSubmit(): void {
    const formValue = { ...this.firstForm.value, ...this.secondForm.value };
    // formValue.birthday = MomentToString(formValue.birthday);
    this.form.patchValue(formValue);
    super.onSubmit();
  }
}
