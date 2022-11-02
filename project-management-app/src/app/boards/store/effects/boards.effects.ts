import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardService } from '../../services/board.service';
import * as BoardsActions from '../actions/boards.actions';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  finalize,
  map,
  mergeMap,
  NEVER,
  Observable,
  of,
  single,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromRoot from '../../../store/reducers/app.reducer';
import * as AppActions from '../../../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private boardService: BoardService,
    private sharedService: SharedService,
    public dialog: MatDialog,
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.loadBoards),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({}) =>
        this.boardService.getBoards().pipe(
          map((boards) => BoardsActions.loadBoardsSuccess({ boards })),
          catchError(() => of(BoardsActions.loadBoardsFailed())),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.createBoard),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ board }) =>
        this.boardService.createBoard(board).pipe(
          map((board) => BoardsActions.createBoardSuccess({ board })),
          catchError(() => of(BoardsActions.createBoardFailed())),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.deleteBoard),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ id }) =>
        this.boardService.deleteBoard(id).pipe(
          map((board) => BoardsActions.deleteBoardSuccess({ id })),
          catchError(() => of(BoardsActions.deleteBoardFailed())),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  deleteBoardSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.deleteBoardSuccess),
      map(() => SharedActions.closeDialog({ message: 'SUCCESS' })),
    ),
  );
}
