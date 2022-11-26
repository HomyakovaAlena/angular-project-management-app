import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState } from '../../models/user.model';
import { BoardsState } from 'src/app/boards/store/reducers/boards.reducer';
import { state } from '@angular/animations';
export const AUTH_FEATURE_KEY = 'auth';

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  isLoadingLogin: false,
  hasLoginError: false,
};

const reducer = createReducer(
  initialState,

  on(
    AuthActions.signupRequest,
    (state): AuthState => ({
      ...state,
      isLoadingLogin: true,
      hasLoginError: false,
    }),
  ),

  on(
    AuthActions.loginRequest,
    (state): AuthState => ({
      ...state,
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
