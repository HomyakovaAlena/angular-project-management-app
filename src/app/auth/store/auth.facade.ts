import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { User } from '../models/user.model';
import * as Utils from '../utils/auth.utils';
import * as AuthActions from './actions/auth.actions';
import * as AuthSelectors from './selectors/auth.selectors';

@Injectable()
export class AuthFacade {
  public auth$ = this.store.select(AuthSelectors.selectAuth);
  public user$ = this.store.select(AuthSelectors.selectAuthUser);
  public isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  public isLoadingLogin$ = this.store.select(AuthSelectors.selectIsLoadingLogin);
  public hasLoginError$ = this.store.select(AuthSelectors.selectLoginError);

  constructor(private store: Store, private tokenStorageService: TokenStorageService) {}

  public signup(name: string, login: string, password: string) {
    this.store.dispatch(AuthActions.signupRequest({ name, login, password }));
  }

  public login(login: string, password: string) {
    this.store.dispatch(AuthActions.loginRequest({ login, password }));
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }

  public getAuthUser(data: { token: string }) {
    this.store.dispatch(AuthActions.getAuthUserRequest({ data }));
  }

  public authIfTokenNotExpired() {
    const token = this.tokenStorageService.getToken();
    if (token && !Utils.isTokenExpired(token)) {
      this.store.dispatch(AuthActions.loginSuccess({ data: { token: token } }));
    }
  }

  public updateUser(user: User) {
    this.store.dispatch(AuthActions.editUser({ user }));
  }

  public deleteUser(id: string) {
    this.store.dispatch(AuthActions.deleteUser({ id }));
  }
}
