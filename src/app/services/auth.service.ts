import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRepository } from '@repositories/user-repository';
import { ComponentService } from '@services/component.service';
import { StorageService } from '@services/storage.service';
import { catchError, of, tap } from 'rxjs';
import { ProfileService } from './profile.service';
import { AlertService } from '@services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  accessToken: string;

  constructor(
    private alertService: AlertService,
    private profile: ProfileService,
    private storage: StorageService,
    private userRepository: UserRepository
  ) {}

  async login(detail: any) {
    return this.userRepository
      .login(detail)
      .pipe(
        tap((res) => {
          this.setToken(res?.data);
          this.profile.setProfile(res?.data?.user);
        })
      )
      .toPromise()
      .then((res) => {
        this.loggedIn();
        return new Promise((resolve, reject) => {
          resolve(res);
        });
      });
  }

  register(detail: any) {
    return this.userRepository.register(detail).toPromise();
  }

  verifyToken() {
    return this.userRepository
      .refreshToken()
      .pipe(
        tap((res) => {
          this.setToken(res.data);
        })
      )
      .toPromise();
  }

  setToken({ accessToken, refreshToken }): void {
    if (accessToken) this.storage.set('access_token', accessToken);
    if (refreshToken) this.storage.set('refresh_token', refreshToken);
  }

  loggedIn() {
    this.isLoggedIn = true;
  }

  endSession() {
    this.isLoggedIn = false;
    this.storage.remove('access_token');
    this.storage.remove('refresh_token');
    this.profile.setProfile(null);
  }

  logout() {
    return this.userRepository.logout().toPromise();
  }
}
