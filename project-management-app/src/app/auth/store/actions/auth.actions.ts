import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

// Signup
export const signupRequest = createAction(
  '[Auth] Signup Request',
  props<{ name: string; login: string; password: string }>(),
);
export const signupSuccess = createAction('[Auth] Signup Success', props<{ user: User }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: Error }>());

// Login
export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ login: string; password: string }>(),
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: { token: string } }>(),
);
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: Error }>());

// Logout
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

// Auth User: me
export const getAuthUserRequest = createAction(
  '[Auth] Auth User Request',
  props<{ data: { token: string } }>(),
);
export const getAuthUserSuccess = createAction('[Auth] Auth User Success', props<{ user: User }>());
export const getAuthUserFailure = createAction('[Auth] Auth User Failure');

// SignUped User: me
export const getSignUpedUserRequest = createAction(
  '[Auth] Auth User Request',
  props<{ user: User }>(),
);
export const getSignUpedUserSuccess = createAction(
  '[Auth] Auth User Success',
  props<{ user: User }>(),
);
export const getSignUpedUserFailure = createAction('[Auth] Auth User Failure');

// Refresh token
// export const refreshTokenRequest = createAction('[Auth] Refresh Token Request');
// export const refreshTokenSuccess = createAction('[Auth] Refresh Token Success');
// export const refreshTokenFailure = createAction('[Auth] Refresh Token Failure');
