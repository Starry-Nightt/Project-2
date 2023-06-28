import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { ROLE } from '@constants/enum';
import { UserRepository } from '@graphql/user.repository';
import { LoginPayload, RegisterPayload } from '@interfaces/auth-interface';
import { AuthRepository } from '@graphql/auth.repository';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  token: string;

  constructor(
    private profile: ProfileService,
    private storage: StorageService,
    private router: Router,
    private authRepository: AuthRepository
  ) {}

  login(detail: LoginPayload) {
    return this.authRepository.login(detail).pipe(
      catchError(() => of()),
      tap((res: any) => {
        this.setToken(res?.data?.login?.token);
        const profile: User = res?.data?.login?.me;
        this.storage.set('email', JSON.stringify(detail.email));
        this.storage.set('password', JSON.stringify(detail.password));
        this.profile.setProfile(profile);
        this.loggedIn();
      })
    );
  }

  register(detail: RegisterPayload) {
    return this.authRepository.register(detail);
  }

  setToken(token: String): void {
    this.storage.set('token', token);
  }

  loggedIn() {
    this.isLoggedIn = true;
    if (this.profile.isAdmin) this.router.navigate(['/manage']);
    else this.router.navigate(['/use']);
  }

  endSession() {
    this.isLoggedIn = false;
    this.token = null;
    this.storage.remove('token');
    this.storage.remove('email');
    this.storage.remove('password');
    this.profile.setProfile(null);
    this.router.navigate(['/login']);
  }

  logout() {
    this.endSession();
  }
}
