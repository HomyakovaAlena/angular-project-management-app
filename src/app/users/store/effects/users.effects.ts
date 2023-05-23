import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import * as UsersActions from '../actions/users.actions';
import * as fromRoot from '../../../store/reducers/app.reducer';
import * as AppActions from '../../../store/actions/app.actions';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';
import { UserService } from '../../services/user.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private userService: UserService,
    private errorHandlingService: ErrorHandlingService,
  ) {}

  fetchUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.loadUsers),
        tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
        switchMap(() =>
          this.userService.getUsers().pipe(
            map((users) => UsersActions.loadUsersSuccess({ users })),
            catchError((error) => of(UsersActions.loadUsersFailed({ error }))),
            finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
          ),
        ),
      ),
    { dispatch: false },
  );

  onFailedActions$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UsersActions.loadUsersFailed),
        map(({ error }) => {
          this.store.dispatch(
            SharedActions.openSnackBar({
              message: this.errorHandlingService.getErrorHandlingMessages(error, 'user'),
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
