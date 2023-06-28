import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { RegisterPayload } from '@interfaces/auth-interface';
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

  register(detail: RegisterPayload) {
    this.authService.register(detail).subscribe(() => {
      this.redirect(['/login']);
    });
  }
}
