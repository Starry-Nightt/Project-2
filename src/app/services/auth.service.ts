import { Injectable } from '@angular/core';
import { UserRepository } from '@repositories/user-repository';
import { StorageService } from '@services/storage.service';
import { finalize, switchMap, tap } from 'rxjs';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  accessToken: string;

  constructor(
    private profile: ProfileService,
    private storage: StorageService,
    private userRepository: UserRepository,
    private router: Router
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
      .then(() => {
        this.loggedIn();
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
          this.setToken(res?.data);
        }),
        switchMap(res => this.userRepository.userInfo(this.accessToken))
      ).toPromise()
  }

  setToken({ accessToken, refreshToken }): void {
    if (accessToken) {
      this.storage.set('access_token', accessToken);
      this.accessToken = accessToken
    }

    if (refreshToken) this.storage.set('refresh_token', refreshToken);
  }

  loggedIn() {
    this.isLoggedIn = true;
    this.router.navigate(['/demo']);
  }

  endSession() {
    this.isLoggedIn = false;
    this.accessToken = ''
    this.storage.remove('access_token');
    this.storage.remove('refresh_token');
    this.profile.setProfile(null);
    this.router.navigate(['/login']);
  }

  logout() {
    return this.userRepository.logout().pipe(tap(() => this.endSession()))
  }
}
