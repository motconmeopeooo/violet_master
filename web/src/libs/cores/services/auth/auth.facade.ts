import { Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './auth.store';
import { AuthService } from './auth.service';
import { select } from '@ngneat/elf';
import { IAuth, ILogin, IRegister } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  accessToken$ = store.pipe(select((state) => state.accessToken));
  user$ = store.pipe(select((state) => state.user));
  constructor(private authService: AuthService) {}

  login(payload: Partial<ILogin>): Observable<IAuth> {
    return this.authService.login(payload).pipe(
      tap((token) => {
        this.update(token);
      })
    );
  }

  register(payload: Partial<IRegister>) {
    return this.authService.register(payload);
  }

  isAuthenticated(): Observable<boolean> {
    return this.accessToken$.pipe(
      map((accessToken) => {
        return !!accessToken && !this.authService.isTokenExpired(accessToken);
      })
    );
  }

  isTokenExpired(token: string): boolean {
    return this.authService.isTokenExpired(token);
  }

  private update(data: Partial<IAuth>) {
    store.update((state) => ({
      ...state,
      ...data,
    }));
  }

  logOut() {
    store.reset();
  }
}
