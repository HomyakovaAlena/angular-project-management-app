import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as BoardsActions from '../actions/boards.actions';
import { Board } from '../../models/board.model';

export interface BoardsState {
  boards: Board[];
}

export const initialState: BoardsState = {
  boards: [],
};

export const boardsReducer = createReducer(
  initialState,
  on(BoardsActions.loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards,
  })),
  on(BoardsActions.createBoardSuccess, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(BoardsActions.deleteBoardSuccess, (state, { id }) => ({
    ...state,
    boards: [...state.boards.filter(board => board._id !== id)],
  })),
);

export const getBoardsState = createFeatureSelector<BoardsState>('boards');
export const getBoards = createSelector(getBoardsState, (state: BoardsState) => state.boards);
