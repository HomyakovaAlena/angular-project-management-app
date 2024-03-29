import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ColumnsActions from '../actions/columns.actions';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { catchError, finalize, map, of, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromRoot from '../../../store/reducers/app.reducer';
import * as AppActions from '../../../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ColumnService } from '../../services/column.service';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';

@Injectable()
export class ColumnsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private columnService: ColumnService,
    public dialog: MatDialog,
    private errorHandlingService: ErrorHandlingService,
  ) {}

  fetchColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.loadColumns),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ boardId }) =>
        this.columnService.getColumns(boardId).pipe(
          map((columns) => ColumnsActions.loadColumnsSuccess({ columns })),
          catchError((error) => of(ColumnsActions.loadColumnsFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  createColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.createColumn),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ column }) =>
        this.columnService.createColumn(column).pipe(
          map((column) => ColumnsActions.createColumnSuccess({ column })),
          catchError((error) => of(ColumnsActions.createColumnFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.updateColumn),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ column }) =>
        this.columnService.updateColumn(column).pipe(
          map((column) => ColumnsActions.updateColumnSuccess({ column })),
          catchError((error) => of(ColumnsActions.updateColumnFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.deleteColumn),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ boardId, columnId }) =>
        this.columnService.deleteColumn(boardId, columnId).pipe(
          map(() => ColumnsActions.deleteColumnSuccess({ boardId, columnId })),
          catchError((error) => of(ColumnsActions.deleteColumnFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  changeColumnsOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.changeColumnsOrder),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ columnsArray }) =>
        this.columnService.changeColumnsOrder(columnsArray).pipe(
          map(({}) => ColumnsActions.changeColumnsOrderSuccess({ columnsArray })),
          catchError((error) => of(ColumnsActions.changeColumnsOrderFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  onSuccededActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ColumnsActions.createColumnSuccess,
          ColumnsActions.deleteColumnSuccess,
          ColumnsActions.updateColumnSuccess,
        ),
        tap(() => {
          this.store.dispatch(SharedActions.closeDialog());
          this.store.dispatch(SharedActions.openSnackBar({ message: $localize`Success!` }));
        }),
      ),
    { dispatch: false },
  );

  onFailedActions$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ColumnsActions.deleteColumnFailed,
          ColumnsActions.createColumnFailed,
          ColumnsActions.loadColumnsFailed,
          ColumnsActions.updateColumnFailed,
          ColumnsActions.changeColumnsOrderFailed,
        ),
        tap(({ error }) => {
          this.store.dispatch(
            SharedActions.openSnackBar({
              message: this.errorHandlingService.getErrorHandlingMessages(error, 'column'),
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
