import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const signupRequest = createAction(
  '[Auth] Signup Request',
  props<{ name: string; login: string; password: string }>(),
);
export const signupSuccess = createAction('[Auth] Signup Success', props<{ user: User }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: Error }>());

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ login: string; password: string }>(),
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: { token: string } }>(),
);
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: Error }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const getAuthUserRequest = createAction(
  '[Auth] Auth User Request',
  props<{ data: { token: string } }>(),
);
export const getAuthUserSuccess = createAction('[Auth] Auth User Success', props<{ user: User }>());
export const getAuthUserFailure = createAction('[Auth] Auth User Failure',  props<{ error: Error }>());

export const getSignUpedUserRequest = createAction(
  '[Auth] Auth User Request',
  props<{ user: User }>(),
);
export const getSignUpedUserSuccess = createAction(
  '[Auth] Auth User Success',
  props<{ user: User }>(),
);
export const getSignUpedUserFailure = createAction('[Auth] Auth User Failure',  props<{ error: Error }>());

export const editUser = createAction('[Auth] Edit User Request', props<{ user: User }>());
export const editUserSuccess = createAction('[Auth] Edit User Success', props<{ user: User }>());
export const editUserFailure = createAction('[Auth] Edit User Failure', props<{ error: Error }>());

export const deleteUser = createAction('[Auth] Delete User Request', props<{ id: string }>());
export const deleteUserSuccess = createAction(
  '[Auth] Delete User Success',
  props<{ user: User }>(),
);
export const deleteUserFailure = createAction(
  '[Auth] Delete User Failure',
  props<{ error: Error }>(),
);
