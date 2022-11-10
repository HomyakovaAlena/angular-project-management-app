import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import * as UsersActions from '../actions/users.actions';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import * as fromRoot from '../../../store/reducers/app.reducer';
import * as AppActions from '../../../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { BoardService } from 'src/app/boards/services/board.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private userService: UserService,
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

  loadUsersSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsersSuccess),
      tap((users) => console.log({ users }, 'loadUsersSuccess effects')),
    ),
  );

  onFailedActions$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UsersActions.loadUsersFailed),
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
