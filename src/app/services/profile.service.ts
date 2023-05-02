import { Injectable } from '@angular/core';
import { ROLE } from '@constants/enum';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  current: User;

  constructor() {}

  get isStudent() {
    return this.current.role === ROLE.STUDENT;
  }

  get isTeacher() {
    return this.current.role === ROLE.TEACHER;
  }

  get isAdmin() {
    return this.current.role === ROLE.ADMIN;
  }

  get roleName() {
    return this.isAdmin ? 'Admin' : this.isStudent ? 'Student' : 'Teacher';
  }

  setProfile(profile: User) {
    this.current = profile;
  }
}
