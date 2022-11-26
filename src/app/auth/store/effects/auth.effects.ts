import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import * as AppActions from '../../../store/actions/app.actions';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { AuthFacade } from '../auth.facade';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { Store } from '@ngrx/store';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private authFacade: AuthFacade,
    private store: Store,
    private errorHandlingService: ErrorHandlingService,
  ) {}

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupRequest),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      exhaustMap((credentials) =>
        this.authService.signup(credentials.name, credentials.login, credentials.password).pipe(
          map((user) => {
            return AuthActions.signupSuccess({ user });
          }),
          catchError((error) => of(AuthActions.signupFailure({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    );
  });

  onSignupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(({ user }) => {
          this.router.navigate(['/boards']);
          this.store.dispatch(
            SharedActions.openSnackBar({ message: $localize`Welcome, ${user.name}:userName:!` }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      exhaustMap((credentials) =>
        this.authService.login(credentials.login, credentials.password).pipe(
          map((data) => {
            this.tokenStorageService.saveToken(data.token);
            return AuthActions.loginSuccess({ data });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    );
  });

  onLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map((data) => {
        if (this.router.url == '/auth/login') {
          this.router.navigateByUrl('/boards');
        }
        return AuthActions.getAuthUserRequest(data);
      }),
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        map(() => {
          this.router.navigateByUrl('/');
          this.authService.logout();
          return AuthActions.logoutSuccess();
        }),
      );
    },
    { dispatch: false },
  );

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getAuthUserRequest),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      exhaustMap(({ data }) =>
        this.authService.getAuthUser(data).pipe(
          map((user) => AuthActions.getAuthUserSuccess({ user })),
          catchError((error) => of(AuthActions.getAuthUserFailure({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    );
  });

  editUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.editUser),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      exhaustMap(({ user }) =>
        this.authService.updateUser(user).pipe(
          map((user) => {
            return AuthActions.editUserSuccess({ user });
          }),
          catchError((error) => of(AuthActions.editUserFailure({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    );
  });

  editUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.editUserSuccess),
        tap(({ user }) => {
          this.store.dispatch(
            SharedActions.openSnackBar({ message: $localize`Successfully updated!` }),
          );
          this.authFacade.authIfTokenNotExpired();
        }),
      );
    },
    { dispatch: false },
  );

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.deleteUser),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      exhaustMap(({ id }) =>
        this.authService.deleteUser(id).pipe(
          map((user) => {
            return AuthActions.deleteUserSuccess({ user });
          }),
          catchError((error) => of(AuthActions.deleteUserFailure({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    );
  });

  deleteUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.deleteUserSuccess),
        tap(({}) => {
          this.store.dispatch(SharedActions.openSnackBar({ message: $localize`Come back!` }));
          this.authFacade.logout();
        }),
      );
    },
    { dispatch: false },
  );

  onFailedActions$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          AuthActions.deleteUserFailure,
          AuthActions.editUserFailure,
          AuthActions.getAuthUserFailure,
          AuthActions.loginFailure,
          AuthActions.signupFailure,
          AuthActions.getSignUpedUserFailure,
        ),
        tap(({ error }) => {
          this.store.dispatch(
            SharedActions.openSnackBar({
              message: this.errorHandlingService.getErrorHandlingMessages(error, 'auth'),
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
