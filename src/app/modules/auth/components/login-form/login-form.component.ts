import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FormFragmentComponent } from '@bases/form-fragment/form-fragment.component';
import { ComponentService } from '@services/component.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent extends FormFragmentComponent<any> implements OnInit {

  override form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(service: ComponentService, private fb: FormBuilder) {
    super(service)
  }

  ngOnInit() {
  }

}
