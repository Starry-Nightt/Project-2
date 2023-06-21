import { Injectable } from '@angular/core';
import { UserRepository } from '@repositories/user-repository';
import { StorageService } from '@services/storage.service';
import { Observable, switchMap, tap } from 'rxjs';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { LoginDetail, RegisterDetail } from '@interfaces/auth-interface';
import { AccountRepository } from '../graphql/account.repository';
import { ROLE } from '@constants/enum';

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
    private router: Router,
    private accountRepository: AccountRepository
  ) {}

  login(detail: LoginDetail): Observable<any> {
    return this.accountRepository.login(detail).pipe(
      tap((res) => {
        this.setToken(res?.data?.login?.token);
        this.storage.set('email', JSON.stringify(detail.email));
        this.storage.set('password', JSON.stringify(detail.password));
        const role = res?.data?.login?.account?.role;
        const accountId = res?.data?.login?.account?.id;
        if (role === ROLE.ADMIN)
          this.profile.setProfile({
            ...res?.data?.login?.admin,
            role,
            accountId,
          });
        else if (role === ROLE.STUDENT)
          this.profile.setProfile({
            ...res?.data?.login?.student,
            role,
            accountId,
          });
        else if (role === ROLE.TEACHER)
          this.profile.setProfile({
            ...res?.data?.login?.teacher,
            role,
            accountId,
          });
        this.loggedIn();
      })
    );
  }

  register(detail: RegisterDetail): Observable<any> {
    return this.accountRepository.register(detail);
  }

  hello(): Observable<any> {
    return this.accountRepository.hello();
  }

  verifyToken(): Observable<any> {
    return this.userRepository.refreshToken().pipe(
      tap((res) => {
        this.setToken(res?.data);
      }),
      switchMap(() => this.userRepository.userInfo(this.accessToken))
    );
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
    this.accessToken = '';
    this.storage.remove('token');
    this.profile.setProfile(null);
    this.router.navigate(['/login']);
  }

  logout() {
    // return this.userRepository.logout().pipe(tap(() => this.endSession()));
    this.endSession();
  }
}
