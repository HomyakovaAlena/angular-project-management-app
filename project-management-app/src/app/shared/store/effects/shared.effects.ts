import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SharedActions from '../actions/shared.actions';
import { catchError, exhaustMap, finalize, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as BoardsActions from '../../../boards/store/actions/boards.actions';
import { ComponentType } from '@angular/cdk/portal';
import { ModalData } from '../../models/shared.model';
import * as fromRoot from '../../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as AppActions from '../../../store/actions/app.actions';

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private store: Store<fromRoot.AppState>,
  ) {}

  openDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.openDialog),
        tap(({ data }) => {
          this.sharedService.openDialog(data);
        }),
      ),
    { dispatch: false },
  );

  confirmDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.confirmDialog),
        tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
        switchMap(({ data }) =>
          of(this.sharedService.confirmDialogAction(data)).pipe(
            map(() => this.store.dispatch(SharedActions.closeDialog({ message: 'Success' }))),
            catchError(() => of(SharedActions.confirmDialogFailed())),
            finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
          ),
        ),
      ),
    { dispatch: false },
  );

  closeDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.closeDialog),
        tap(() => this.dialog.closeAll()),
      ),
    { dispatch: false },
  );
}
