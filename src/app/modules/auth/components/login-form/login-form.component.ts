import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FormFragmentComponent } from '@bases/form-fragment/form-fragment.component';
import { LoginPayload } from '@interfaces/auth-interface';
import { ComponentService } from '@services/component.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent
  extends FormFragmentComponent<LoginPayload>
  implements OnInit
{
  override form = this.fb.group({
    email: ['king@gmail.com', [Validators.required, Validators.email]],
    password: ['123', [Validators.required]],
  });

  constructor(service: ComponentService, private fb: FormBuilder) {
    super(service);
  }
}
