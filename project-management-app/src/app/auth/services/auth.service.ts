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

export interface AccessData {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  // refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private hostUrl: string;
  // private clientId: string;
  private clientSecret: string;
  private url = 'auth';

  constructor(
    private store: Store,
    private httpClient: HttpClient,
    private configService: ConfigService, // private tokenStorageService: TokenStorageService,
  ) {
    // this.hostUrl = this.configService.getAPIUrl();
    const authConfig = this.configService.getAuthSettings();
    // this.clientId = authConfig.clientId;
    this.clientSecret = authConfig.secretId;
  }

  /**
   * Returns a promise that waits until
   * refresh token and get auth user
   *
   * @returns {Promise<AuthState>}
   */
  init(): Promise<AuthState> {
    // this.store.dispatch(AuthActions.refreshTokenRequest());

    const authState$ = this.store.select(AuthSelectors.selectAuth).pipe(
      tap((data) => console.log({ data }, 'from auth state')),
      filter(
        (auth) =>
          auth.accessTokenStatus === TokenStatus.INVALID ||
          (auth.accessTokenStatus === TokenStatus.VALID && !!auth.user),
      ),

      take(1),
    );

    return lastValueFrom(authState$);
  }

  // /**
  //  * Performs a request with user credentials
  //  * in order to get auth tokens
  //  *
  //  * @param {string} username
  //  * @param {string} password
  //  * @returns Observable<AccessData>
  //  */
  // login(name: string, login: string, password: string): Observable<AccessData> {
  //   return this.http.post<AccessData>(`${this.hostUrl}/api/auth/login`, {
  //     client_id: this.clientId,
  //     client_secret: this.clientSecret,
  //     grant_type: 'password',
  //     name,
  //     login,
  //     password,
  //   });
  // }

  signup(name: string, login: string, password: string): Observable<User> {
    console.log(name, login, password);
    // console.log(
    //   this.httpClient.post<User>(`${this.url}/signup`, {
    //     // client_id: this.clientId,
    //     // client_secret: this.clientSecret,
    //     // grant_type: 'password',
    //     name,
    //     login,
    //     password,
    //   }),
    //   'from auth service login',
    // );
    return this.httpClient.post<User>(`${this.url}/signup`, {
      // client_id: this.clientId,
      // client_secret: this.clientSecret,
      // grant_type: 'password',
      name,
      login,
      password,
    });
  }

  login(login: string, password: string): Observable<{ token: string }> {
    console.log(login, password);
    // console.log(
    //   this.httpClient.post<User>(`${this.url}/signup`, {
    //     // client_id: this.clientId,
    //     // client_secret: this.clientSecret,
    //     // grant_type: 'password',
    //     name,
    //     login,
    //     password,
    //   }),
    //   'from auth service login',
    // );
    return this.httpClient.post<{ token: string }>(`${this.url}/signin`, {
      // client_id: this.clientId,
      // client_secret: this.clientSecret,
      // grant_type: 'password',
      login,
      password,
    });
  }

  /**
   * Performs a request for logout authenticated user
   *
   * @param {('all' | 'allButCurrent' | 'current')} [clients='current']
   * @returns Observable<void>
   */
  logout(): void {
    // const params = new HttpParams().append('clients', clients);
    // console.log(this.httpClient.get<void>(this.url, { params }), 'from logout service');
    // console.log({ params });
    // return this.httpClient.get<void>(this.url);
    console.log('logout');
  }

  // /**
  //  * Asks for a new access token given
  //  * the stored refresh token
  //  *
  //  * @returns {Observable<AccessData>}
  //  */
  // refreshToken(): Observable<AccessData> {
  //   const refreshToken = this.tokenStorageService.getRefreshToken();
  //   if (!refreshToken) {
  //     return throwError(() => new Error('Refresh token does not exist'));
  //   }

  //   return this.httpClient.post<AccessData>(this.url, {
  //     // client_id: this.clientId,
  //     client_secret: this.clientSecret,
  //     grant_type: 'refresh_token',
  //     refresh_token: refreshToken,
  //   });
  // }

  /**
   * Returns authenticated user
   * based on saved access token
   *
   * @returns {Observable<AuthUser>}
   */
  getAuthUser(data: { token: string }): Observable<User> {
    const id = Utils.parseJwt(data.token).id;
    console.log(this.httpClient.get<User>(`users/${id}`), 'get user from service');
    return this.httpClient.get<User>(`users/${id}`);
  }
}

export const authServiceInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => () => authService.init(),
  deps: [AuthService],
  multi: true,
};
