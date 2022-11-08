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

  // Signup
  on(
    AuthActions.signupRequest,
    (state): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.VALIDATING,
      isLoadingLogin: true,
      hasLoginError: false,
    }),
  ),

  // Login
  on(
    AuthActions.loginRequest,
    (state): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.VALIDATING,
      isLoggedIn: true,
      isLoadingLogin: false,
      hasLoginError: false,
    }),
  ),

  //   on(
  //   AuthActions.loginSuccess
  //   (state): AuthState => ({
  //     ...state,
  //     isLoggedIn: true,
  //     isLoadingLogin: false,
  //     accessTokenStatus: TokenStatus.VALID,
  //   }),
  // ),

  // // Refresh token
  // on(
  //   AuthActions.refreshTokenRequest,
  //   (state): AuthState => ({
  //     ...state,
  //     refreshTokenStatus: TokenStatus.VALIDATING,
  //   }),
  // ),

  // Login & Refresh token
  // on(
  //   AuthActions.loginSuccess
  //   (state): AuthState => ({
  //     ...state,
  //     isLoggedIn: true,
  //     isLoadingLogin: false,
  //     accessTokenStatus: TokenStatus.VALID,
  //   }),
  // ),
  // on(
  //   AuthActions.loginFailure
  //   (state, action): AuthState => ({
  //     ...state,
  //     isLoadingLogin: false,
  //     accessTokenStatus: TokenStatus.INVALID,
  //     hasLoginError: action.type === '[Auth] Login Failure' && !!action.error,
  //   }),
  // ),

  // Logout
  on(
    AuthActions.logout,
    (): AuthState => ({
      ...initialState,
    }),
  ),

  // Auth user
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
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
