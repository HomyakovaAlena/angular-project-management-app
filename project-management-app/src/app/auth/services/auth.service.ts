import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { ConfigService } from '../../core/services/config.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import * as AuthActions from '../store/actions/auth.actions';
import { AuthState, User, TokenStatus } from '../models/user.model';
import * as AuthSelectors from '../store/selectors/auth.selectors';
import * as Utils from '../utils/auth.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'auth';
  private usersUrl = 'users';

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {}

  signup(name: string, login: string, password: string): Observable<User> {
    console.log(name, login, password);
    return this.httpClient.post<User>(`${this.url}/signup`, {
      name,
      login,
      password,
    });
  }

  login(login: string, password: string): Observable<{ token: string }> {
    console.log(login, password);
    return this.httpClient.post<{ token: string }>(`${this.url}/signin`, {
      login,
      password,
    });
  }

  logout(): void {
    console.log('logout');

    console.log('aaa');
    this.tokenStorageService.removeToken();
    console.log('bbb');
  }

  getAuthUser(data: { token: string }): Observable<User> {
    const id = Utils.parseJwt(data.token).id;
    return this.httpClient.get<User>(`${this.usersUrl}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    const { login, name, password } = user;
    return this.httpClient.put<User>(`${this.usersUrl}/${user._id}`, {
      login,
      name,
      password,
    });
  }

  deleteUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.httpClient.delete<User>(url).pipe(tap((_) => console.log(`deleted user id=${id}`)));
  }
}
