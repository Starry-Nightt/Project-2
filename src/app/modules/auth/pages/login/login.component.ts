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

  async login(detail: any) {
    await this.authService.login(detail);
    this.authService;
    this.redirect(['/demo']);
  }

  async verify() {
    if (!this.storage.get('refresh_token')) return;
    await this.authService.verifyToken();
    const res = await this.userRepository
      .userInfo(this.storage.get('access_token'))
      .toPromise();
    if (!res?.data) return;
    const { email, password } = res.data;
    this.login({ email, password });
  }
}
