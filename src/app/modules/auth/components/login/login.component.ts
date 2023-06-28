import { Component } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { LoginPayload } from '@interfaces/auth-interface';
import { ComponentService } from '@services/component.service';
import { StorageService } from '@services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent {
  constructor(
    service: ComponentService,
    private authService: AuthService,
    private storage: StorageService
  ) {
    super(service);
  }

  ngOnInit() {
    if (!this.storage.get('email') || !this.storage.get('password')) return;
    const detail = {
      email: JSON.parse(this.storage.get('email')),
      password: JSON.parse(this.storage.get('password')),
    };
    this.login(detail);
  }

  login(detail: LoginPayload) {
    this.authService.login(detail).subscribe();
  }
}
