import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { AccountRepository } from '@graphql/account.repository';
import { ComponentService } from '@services/component.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent extends BaseComponent implements OnInit {
  constructor(
    service: ComponentService,
    public profile: ProfileService,
    private authService: AuthService,
    private accountRepository: AccountRepository
  ) {
    super(service);
  }

  ngOnInit() {}

  getName() {
    return this.profile.current?.fullName;
  }

  getRoleName() {
    if (this.profile.isAdmin) return 'Admin';
    else if (this.profile.isStudent) return 'Student';
    else if (this.profile.isTeacher) return 'Teacher';
    return null;
  }

  onLogout() {
    this.authService.logout();
  }

  onVerify() {
    this.authService.verifyToken();
  }

  getUserList() {
    this.accountRepository.getAllAccount().subscribe((res) => {
      console.log(res);
    });
  }
}
