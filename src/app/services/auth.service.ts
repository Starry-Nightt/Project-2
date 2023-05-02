import { Injectable } from '@angular/core';
import { UserRepository } from '@repositories/user-repository';
import { StorageService } from '@services/storage.service';
import { Observable, switchMap, tap } from 'rxjs';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { LoginDetail, RegisterDetail } from '@interfaces/auth-interface';

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

  login(detail: LoginDetail): Observable<any> {
    return this.userRepository.login(detail).pipe(
      tap((res) => {
        this.setToken(res?.data);
        this.profile.setProfile(res?.data?.user);
        this.loggedIn();
      })
    );
  }

  register(detail: RegisterDetail): Observable<any> {
    return this.userRepository.register(detail);
  }

  verifyToken(): Observable<any> {
    return this.userRepository.refreshToken().pipe(
      tap((res) => {
        this.setToken(res?.data);
      }),
      switchMap(() => this.userRepository.userInfo(this.accessToken))
    );
  }

  setToken({ accessToken, refreshToken }): void {
    if (accessToken) {
      this.storage.set('access_token', accessToken);
      this.accessToken = accessToken;
    }

    if (refreshToken) this.storage.set('refresh_token', refreshToken);
  }

  loggedIn() {
    this.isLoggedIn = true;
    if (this.profile.isAdmin) this.router.navigate(['/manage']);
    else this.router.navigate(['/use']);
  }

  endSession() {
    this.isLoggedIn = false;
    this.accessToken = '';
    this.storage.remove('access_token');
    this.storage.remove('refresh_token');
    this.profile.setProfile(null);
    this.router.navigate(['/login']);
  }

  logout(): Observable<any> {
    return this.userRepository.logout().pipe(tap(() => this.endSession()));
  }
}
