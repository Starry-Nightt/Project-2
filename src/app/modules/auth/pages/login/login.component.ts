import { Component } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { LoginDetail } from '@interfaces/auth-interface';
import { ComponentService } from '@services/component.service';
import { StorageService } from '@services/storage.service';
import { catchError, of } from 'rxjs';
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

  login(detail: LoginDetail) {
    this.authService.login(detail).subscribe();
  }

  verify() {
    if (!this.storage.get('refresh_token')) return;
    this.authService.verifyToken().subscribe((res) => {
      const { email, password } = res.data;
      this.login({ email, password });
    });
  }
}
