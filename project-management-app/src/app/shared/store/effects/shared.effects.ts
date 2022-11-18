import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SharedActions from '../actions/shared.actions';
import { catchError, concat, exhaustMap, finalize, map, of, switchMap, tap, zip } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import * as fromRoot from '../../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as AppActions from '../../../store/actions/app.actions';

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private sharedService: SharedService,
    private store: Store<fromRoot.AppState>,
  ) {}

  openDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.openDialog),
        tap(({ data }) => {
          console.log('in effects');
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
            tap(() => {
              this.store.dispatch(SharedActions.closeDialog());
            }),
            catchError((error) => of(SharedActions.confirmDialogFailed(error))),
            finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
          ),
        ),
      ),
    { dispatch: false },
  );

  // confirmDialogFailed$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(SharedActions.confirmDialogFailed),
  //       tap((error) => {
  //         console.log(error, 'from failed');
  //         this.store.dispatch(SharedActions.openSnackBar({ message: 'Failed' }));
  //       }),
  //     ),
  //   { dispatch: false },
  // );

  closeDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.closeDialog),
        tap(() => {
          this.sharedService.closeDialog();
        }),
      ),
    { dispatch: false },
  );

  openSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.openSnackBar),
        tap(({ message }) => {
          this.sharedService.openSnackBar(message);
        }),
      ),
    { dispatch: false },
  );
}
