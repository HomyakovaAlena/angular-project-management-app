import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UsersActions from '../actions/users.actions';
import { User } from '../../../auth/models/user.model';

export interface UsersState {
  users: User[];
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
  // on(BoardsActions.createBoardSuccess, (state, { board }) => ({
  //   ...state,
  //   boards: [...state.boards, board],
  // })),
  // on(BoardsActions.deleteBoardSuccess, (state, { id }) => ({
  //   ...state,
  //   boards: [...state.boards.filter(board => board._id !== id)],
  // })),
);

export const getUsersState = createFeatureSelector<UsersState>('users');
export const getUsers = createSelector(getUsersState, (state: UsersState) => state.users);
