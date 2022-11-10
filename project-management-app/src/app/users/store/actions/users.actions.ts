import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';

export const loadUsers = createAction('[Users] Get Users');
export const loadUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: User[] }>(),
);
export const loadUsersFailed = createAction('[Users] Get Users Failed', props<{ error: Error }>());
