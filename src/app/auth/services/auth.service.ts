import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { User } from '../models/user.model';
import * as Utils from '../utils/auth.utils';
import * as fromRoot from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as AppActions from '../../store/actions/app.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'auth';
  private usersUrl = 'users';

  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService,
    private store: Store<fromRoot.AppState>,
  ) {}

  public signup(name: string, login: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/signup`, {
      name,
      login,
      password,
    });
  }

  public login(login: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.url}/signin`, {
      login,
      password,
    });
  }

  public logout(): void {
    this.tokenStorageService.removeToken();
    this.store.dispatch(AppActions.reset());
  }

  public getAuthUser(data: { token: string }): Observable<User> {
    const id = Utils.parseJwt(data.token).id;
    return this.httpClient.get<User>(`${this.usersUrl}/${id}`);
  }

  public updateUser(user: User): Observable<User> {
    const { login, name, password } = user;
    return this.httpClient.put<User>(`${this.usersUrl}/${user._id}`, {
      login,
      name,
      password,
    });
  }

  public deleteUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.httpClient.delete<User>(url);
  }
}
