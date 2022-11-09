import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { User } from '../models/user.model';
import * as Utils from '../utils/auth.utils';

import * as AuthActions from './actions/auth.actions';
import * as AuthSelectors from './selectors/auth.selectors';

@Injectable()
export class AuthFacade {
  auth$ = this.store.select(AuthSelectors.selectAuth);
  user$ = this.store.select(AuthSelectors.selectAuthUser);
  isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  isLoadingLogin$ = this.store.select(AuthSelectors.selectIsLoadingLogin);
  hasLoginError$ = this.store.select(AuthSelectors.selectLoginError);

  constructor(private store: Store, private tokenStorageService: TokenStorageService) {}

  signup(name: string, login: string, password: string) {
    this.store.dispatch(AuthActions.signupRequest({ name, login, password }));
  }

  login(login: string, password: string) {
    this.store.dispatch(AuthActions.loginRequest({ login, password }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  getAuthUser(data: { token: string }) {
    this.store.dispatch(AuthActions.getAuthUserRequest({ data }));
  }

  authIfTokenNotExpired() {
    const token = this.tokenStorageService.getToken();
    if (token && !Utils.isTokenExpired(token)) {
      this.store.dispatch(AuthActions.loginSuccess({ data: { token: token } }));
    }
  }

  updateUser(user: User) {
    this.store.dispatch(AuthActions.editUser({ user }));
  }

  deleteUser(id: string) {
    this.store.dispatch(AuthActions.deleteUser({ id }));
  }
}
