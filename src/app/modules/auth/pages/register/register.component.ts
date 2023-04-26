import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { ComponentService } from '@services/component.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent extends BaseComponent {
  constructor(service: ComponentService, private authService: AuthService) {
    super(service);
  }

  ngOnInit() {}

  async register(detail: any) {
    await this.authService.register(detail);
    this.redirect(['/login']);
  }
}
