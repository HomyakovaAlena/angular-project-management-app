import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import * as UsersActions from '../actions/users.actions';
// import * as SharedActions from '../../../shared/store/actions/shared.actions';
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
import * as fromRoot from '../../../store/reducers/app.reducer';
import * as AppActions from '../../../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { BoardService } from 'src/app/boards/services/board.service';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { SharedService } from '../../../shared/services/shared.service';
// import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private boardService: BoardService,
    private userService: UserService,
    private sharedService: SharedService, // public dialog: MatDialog,
  ) {}

  fetchUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.loadUsers),
        tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
        switchMap(() =>
          this.userService.getUsers().pipe(
            tap((users) => console.log({ users }, 'loadUsers effects')),
            map((users) => UsersActions.loadUsersSuccess({ users })),
            catchError(() => of(UsersActions.loadUsersFailed())),
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
}
//   createBoard$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(BoardsActions.createBoard),
//       tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
//       switchMap(({ board }) =>
//         this.boardService.createBoard(board).pipe(
//           tap((board) => console.log({ board }, 'from effects')),
//           map((board) => BoardsActions.createBoardSuccess({ board })),
//           catchError(() => of(BoardsActions.createBoardFailed())),
//           finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
//         ),
//       ),
//     ),
//   );

//   createBoardSuccess$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(BoardsActions.createBoardSuccess),
//       map(() => SharedActions.closeDialog({ message: 'SUCCESS' })),
//     ),
//   );

//   deleteBoard$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(BoardsActions.deleteBoard),
//       tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
//       switchMap(({ id }) =>
//         this.boardService.deleteBoard(id).pipe(
//           map(() => BoardsActions.deleteBoardSuccess({ id })),
//           catchError(() => of(BoardsActions.deleteBoardFailed())),
//           finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
//         ),
//       ),
//     ),
//   );

//   deleteBoardSuccess$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(BoardsActions.deleteBoardSuccess),
//       map(() => SharedActions.closeDialog({ message: 'SUCCESS' })),
//     ),
//   );
// }
