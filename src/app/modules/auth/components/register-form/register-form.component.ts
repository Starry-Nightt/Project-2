import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormFragmentComponent } from '@bases/form-fragment/form-fragment.component';
import { ComponentService } from '@services/component.service';
import { GENDER, ROLE, STATUS } from '@constants/enum';
import { RegisterDetail } from '@interfaces/auth-interface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent
  extends FormFragmentComponent<RegisterDetail>
  implements OnInit
{
  genderRadioButtons = [
    {
      value: GENDER.MALE,
      viewValue: 'Nam',
    },
    {
      value: GENDER.FEMALE,
      viewValue: 'Nữ',
    },
  ];

  override form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    username: ['', [Validators.required]],
    gender: [null, [Validators.required]],
    status: [STATUS.ACTIVE, [Validators.required]],
    roleId: [ROLE.STUDENT, [Validators.required]],
  });

  constructor(service: ComponentService, private fb: FormBuilder) {
    super(service);
  }

  ngOnInit() {}
}
