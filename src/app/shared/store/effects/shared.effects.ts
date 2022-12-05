import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SharedActions from '../actions/shared.actions';
import { SharedService } from '../../services/shared.service';
import * as fromRoot from '../../../store/reducers/app.reducer';
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
        map(({ data }) => {
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
            map(() => {
              this.store.dispatch(SharedActions.closeDialog());
            }),
            catchError((error) => of(SharedActions.confirmDialogFailed(error))),
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
        map(() => {
          this.sharedService.closeDialog();
        }),
      ),
    { dispatch: false },
  );

  openSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.openSnackBar),
        map(({ message }) => {
          this.sharedService.openSnackBar(message);
        }),
      ),
    { dispatch: false },
  );
}
