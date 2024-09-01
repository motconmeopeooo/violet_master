import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from '../http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { IAuth, ILogin, IRegister, IToken } from '../../models/user.model';

export const API_AUTH = `${environment.apiUrl}/api/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpService,
    private jwtService: JwtHelperService
  ) {}

  login(payload: Partial<ILogin>): Observable<IAuth> {
    return this.http
      .post<IToken>(`${API_AUTH}/login`, payload)
      .pipe(map((token) => this.authenticate(token)));
  }

  register(payload: Partial<IRegister>) {
    return this.http.post<IRegister>(`${API_AUTH}/register`, payload);
  }

  isTokenExpired(token: string): boolean {
    return this.jwtService.isTokenExpired(token);
  }

  private authenticate(authToken: IToken): IAuth {
    return {
      ...authToken,
      user: this.jwtService.decodeToken(String(authToken.accessToken)),
    };
  }
}
