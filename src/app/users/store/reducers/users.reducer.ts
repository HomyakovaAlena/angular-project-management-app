import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UsersActions from '../actions/users.actions';
import { User } from '../../../auth/models/user.model';

export interface UsersState {
  users: User[];
  // foundUsers?: User[];
}

export const initialState: UsersState = {
  users: [],
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
  // on(UsersActions.searchUsersSuccess, (state, { users }) => ({
  //   ...state,
  //   foundUsers: users,
  // })),
);

export const getUsersState = createFeatureSelector<UsersState>('users');
export const getUsers = createSelector(getUsersState, (state: UsersState) => state.users);
// export const getFoundUsers = createSelector(getUsersState, (state: UsersState) => state.foundUsers);
