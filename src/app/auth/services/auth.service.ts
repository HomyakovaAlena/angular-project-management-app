import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { User } from '../models/user.model';
import * as Utils from '../utils/auth.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'auth';
  private usersUrl = 'users';

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {}

  signup(name: string, login: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/signup`, {
      name,
      login,
      password,
    });
  }

  login(login: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.url}/signin`, {
      login,
      password,
    });
  }

  logout(): void {
    this.tokenStorageService.removeToken();
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
    return this.httpClient.delete<User>(url);
  }
}
