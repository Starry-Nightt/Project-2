import { Component } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
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
    private userRepository: UserRepository,
    private storage: StorageService
  ) {
    super(service);
  }

  ngOnInit() {
    this.verify();
  }

  login(detail: any) {
    this.authService.login(detail);
  }

  async verify() {
    if (!this.storage.get('refresh_token')) return;
    const res = await this.authService.verifyToken();
    if (!res?.data) return;
    const { email, password } = res.data;
    this.login({ email, password });
  }
}
