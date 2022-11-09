import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { AuthState, TokenStatus } from '../../models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  accessTokenStatus: TokenStatus.PENDING,
  // refreshTokenStatus: TokenStatus.PENDING,
  isLoadingLogin: false,
  hasLoginError: false,
};

const reducer = createReducer(
  initialState,

  on(
    AuthActions.signupRequest,
    (state): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.VALIDATING,
      isLoadingLogin: true,
      hasLoginError: false,
    }),
  ),

  on(
    AuthActions.loginRequest,
    (state): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.VALIDATING,
      isLoadingLogin: false,
      hasLoginError: false,
    }),
  ),

  on(
    AuthActions.loginSuccess,
    (state): AuthState => ({
      ...state,
      isLoggedIn: true,
      isLoadingLogin: false,
      accessTokenStatus: TokenStatus.VALID,
    }),
  ),

  on(
    AuthActions.logout,
    (): AuthState => ({
      ...initialState,
    }),
  ),

  on(
    AuthActions.getAuthUserSuccess,
    (state, action): AuthState => ({
      ...state,
      user: action.user,
    }),
  ),
  on(
    AuthActions.getAuthUserFailure,
    (): AuthState => ({
      ...initialState,
    }),
  ),

  on(
    AuthActions.editUser,
    (state): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.VALIDATING,
      isLoadingLogin: true,
      hasLoginError: false,
    }),
  ),

  on(
    AuthActions.deleteUser,
    (): AuthState => ({
      ...initialState,
    }),
  ),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
