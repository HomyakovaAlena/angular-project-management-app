import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardService } from '../../services/board.service';
import * as BoardsActions from '../actions/boards.actions';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
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
      switchMap(({ userId }) =>
        this.boardService.getBoards(userId).pipe(
          map((boards) => BoardsActions.loadBoardsSuccess({ boards })),
          catchError((error) => of(BoardsActions.loadBoardsFailed({ error }))),
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
          catchError((error) => of(BoardsActions.createBoardFailed({ error }))),
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
          map(() => BoardsActions.deleteBoardSuccess({ id })),
          catchError((error) => of(BoardsActions.deleteBoardFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  onSuccededActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardsActions.createBoardSuccess, BoardsActions.deleteBoardSuccess),
        tap(() => {
          this.store.dispatch(SharedActions.closeDialog());
          this.store.dispatch(SharedActions.openSnackBar({ message: 'Success!' }));
        }),
      ),
    { dispatch: false },
  );

  onFailedActions$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          BoardsActions.deleteBoardFailed,
          BoardsActions.createBoardFailed,
          BoardsActions.loadBoardsFailed,
        ),
        tap(({ error }) => {
          console.log(error);
          this.store.dispatch(
            SharedActions.openSnackBar({ message: `Failed, reason: ${error.message}` }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
