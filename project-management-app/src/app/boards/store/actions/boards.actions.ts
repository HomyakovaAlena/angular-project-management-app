import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/board.model';

export const loadBoards = createAction('[loadBoards] Load');
export const loadBoardsSuccess = createAction(
  '[Boards] Load Success',
  props<{ boards: Board[] }>(),
);
export const loadBoardsFailed = createAction('[Boards] Load Failed');

export const createBoard = createAction('[Boards] Add board', props<{ board: Board }>());
export const createBoardSuccess = createAction(
  '[Boards] Add board Success',
  props<{ board: Board }>(),
);
export const createBoardFailed = createAction('[Boards] Add board Failed');

export const deleteBoard = createAction('[Boards] Delete board', props<{ id: string }>());
export const deleteBoardSuccess = createAction(
  '[Boards] Delete board Success',
  props<{ id: string }>(),
);
export const deleteBoardFailed = createAction('[Boards] Delete board Failed');

