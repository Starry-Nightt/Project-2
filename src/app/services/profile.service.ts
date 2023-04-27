import { Injectable } from '@angular/core';
import { ROLE } from '@constants/enum';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  current: any;

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

  setProfile(profile: any) {
    this.current = profile;
  }
}
