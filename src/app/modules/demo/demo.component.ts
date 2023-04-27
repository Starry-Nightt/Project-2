import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { UserRepository } from '@repositories/user-repository';
import { ComponentService } from '@services/component.service';
import { StringToMoment } from '@utils/convert';
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
    private userRepository: UserRepository
  ) {
    super(service);
  }

  ngOnInit() {
    console.log(StringToMoment(this.profile.current.birthday));
  }

  getName() {
    return this.profile.current?.username;
  }

  getRoleName() {
    if (this.profile.isAdmin) return 'Admin';
    else if (this.profile.isStudent) return 'Student';
    else if (this.profile.isTeacher) return 'Teacher';
    return null;
  }

  onLogout() {
    this.authService.logout().subscribe();
  }

  onVerify() {
    this.authService.verifyToken();
  }

  getUserList() {
    this.userRepository.getAllUser().subscribe((res) => {
      console.log(res);
    });
  }
}
