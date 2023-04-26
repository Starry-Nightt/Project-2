import { Injectable } from '@angular/core';
import { ROLE } from '@constants/enum';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  current: any;

  constructor() {}

  get isStudent() {
    return this.current.roleId === ROLE.STUDENT;
  }

  get isTeacher() {
    return this.current.roleId === ROLE.TEACHER;
  }

  get isAdmin() {
    return this.current.roleId === ROLE.ADMIN;
  }

  setProfile(profile: any) {
    this.current = profile;
  }
}
