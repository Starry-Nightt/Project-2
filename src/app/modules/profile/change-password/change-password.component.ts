import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRepository } from '@graphql/auth.repository';
import { UserRepository } from '@graphql/user.repository';
import { ChangePasswordPayload } from '@interfaces/auth-interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form = this.fb.group({
    currentPwd: ['', [Validators.required]],
    newPwd: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private authRepository: AuthRepository
  ) {}

  ngOnInit() {}

  onChangePassword() {
    const payload: ChangePasswordPayload = {
      currentPwd: this.form.value.currentPwd,
      newPwd: this.form.value.newPwd,
    };
    this.authRepository.changePassword(payload).subscribe();
  }
}
