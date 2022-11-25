import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';

export const loadUsers = createAction('[Users] Get Users');
export const loadUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: User[] }>(),
);
export const loadUsersFailed = createAction(
  '[Users] Get Users Failed',
  props<{ error: HttpErrorResponse }>(),
);

// export const searchUsers = createAction('[Users] Search Users', props<{ term: string }>());
// export const searchUsersSuccess = createAction(
//   '[Users] Search Users Success',
//   props<{ users: User[]; term: string }>(),
// );
// export const searchUsersFailed = createAction(
//   '[Users] Search Users Failed',
//   props<{ error: HttpErrorResponse }>(),
// );
