import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';

import { TokenStorageService } from '../../../core/services/token-storage.service';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
  ) {}

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupRequest),
      exhaustMap((credentials) =>
        this.authService.signup(credentials.name, credentials.login, credentials.password).pipe(
          map((user) => {
            // save tokens
            // this.tokenStorageService.saveTokens(user.access_token, data.refresh_token);
            // trigger login success action
            console.log(user, 'from signup effect');
            return AuthActions.signupSuccess({ user });
          }),
          catchError((error) => of(AuthActions.signupFailure({ error }))),
        ),
      ),
    );
  });

  onSignupSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupSuccess),
      map(({ user }) => {
        // redirect to return url or home
        // console.log(
        //   this.activatedRoute.snapshot.queryParams['returnUrl'] || '/',
        //   'from signupsuccess activate route',
        // );
        console.log({ user }, 'from onsignupedsuccess');
        this.router.navigate(['/boards']);
        // this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['returnUrl'] || '/');
        return AuthActions.getSignUpedUserRequest({ user });
      }),
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((credentials) =>
        this.authService.login(credentials.login, credentials.password).pipe(
          map((data) => {
            console.log(data, 'from login effect');
            // save tokens
            this.tokenStorageService.saveToken(data.token);
            // trigger login success action
            return AuthActions.loginSuccess({ data });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    );
  });

  onLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map((data) => {
        // redirect to return url or home
        // console.log(
        //   this.activatedRoute.snapshot.queryParams['returnUrl'] || '/',
        //   'from loginsuccess activate route',
        // );
        this.router.navigate(['/boards']);
        // this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['returnUrl'] || '/');
        return AuthActions.getAuthUserRequest(data);
      }),
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() => {
          this.router.navigateByUrl('/');
          return this.authService.logout().pipe(
            finalize(() => {
              console.log(this.tokenStorageService.removeToken(), 'from remove tokens');
              this.tokenStorageService.removeToken();
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getAuthUserRequest),
      exhaustMap(({ data }) =>
        this.authService.getAuthUser(data).pipe(
          map((user) => AuthActions.getAuthUserSuccess({ user })),
          catchError(() => of(AuthActions.getAuthUserFailure())),
        ),
      ),
    );
  });

  // getUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AuthActions.refreshTokenSuccess, AuthActions.getAuthUserRequest),
  //     exhaustMap(() =>
  //       this.authService.getAuthUser().pipe(
  //         map((user) => AuthActions.getAuthUserSuccess({ user })),
  //         catchError(() => of(AuthActions.getAuthUserFailure())),
  //       ),
  //     ),
  //   );
  // });

  // refreshToken$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AuthActions.refreshTokenRequest),
  //     exhaustMap(() =>
  //       this.authService.refreshToken().pipe(
  //         map((data) => {
  //           // save tokens
  //           this.tokenStorageService.saveTokens(data.access_token, data.refresh_token);
  //           // trigger refresh token success action
  //           return AuthActions.refreshTokenSuccess();
  //         }),
  //         catchError(() => of(AuthActions.refreshTokenFailure())),
  //       ),
  //     ),
  //   );
  // });

  // onLoginOrRefreshTokenFailure$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.loginFailure, AuthActions.refreshTokenFailure),
  //       tap(() => {
  //         this.tokenStorageService.removeTokens();
  //       }),
  //     );
  //   },
  //   { dispatch: false },
  // );
}
