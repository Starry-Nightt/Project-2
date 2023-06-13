import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { ComponentService } from '@services/component.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss'],
})
export class UserNavComponent extends BaseComponent implements OnInit {
  constructor(
    service: ComponentService,
    public profile: ProfileService,
    private authService: AuthService
  ) {
    super(service);
  }

  get fullName() {
    return this.profile.current.fullName;
  }

  get role() {
    return this.profile.roleName;
  }

  get isAdmin() {
    return this.profile.isAdmin;
  }

  get isStudent() {
    return this.profile.isStudent;
  }

  get isTeacher() {
    return this.profile.isTeacher;
  }

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }
}
