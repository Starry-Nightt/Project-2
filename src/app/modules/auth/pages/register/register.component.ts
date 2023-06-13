import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { RegisterDetail } from '@interfaces/auth-interface';
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

  register(detail: RegisterDetail) {
    console.log(detail);
    this.authService.register(detail).subscribe((res) => {
      this.redirect(['/login']);
    });
    // this.authService.hello().subscribe((res) => {
    //   console.log(res);
    // });
  }
}
