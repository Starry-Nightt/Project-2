import { Component } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { LoginDetail } from '@interfaces/auth-interface';
import { UserRepository } from '@repositories/user-repository';
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
    this.verify();
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
