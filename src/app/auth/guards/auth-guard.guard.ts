import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { selectIsLoggedIn } from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      take(1),
      tap((isLoggedIn) => {
        console.log('check if login in auth guard');
        if (!isLoggedIn) {
          console.log('not logged in, so go to auth login')
          // console.log({ queryParams: { returnUrl: state.url } }, 'from auth guard');
          this.router.navigate(['/auth/login']);
        }
      }),
    );
  }
}
