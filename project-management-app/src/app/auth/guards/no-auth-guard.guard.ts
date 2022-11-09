import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { selectIsLoggedIn } from '../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuardGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      take(1),
      map((isLoggedIn) => {
        console.log('no-AuthGuard#canActivate called');
        if (isLoggedIn) {
          console.log('isLoggedIn in guard');
          this.router.navigateByUrl('/boards');
        }
        return !isLoggedIn;
      }),
    );
  }
}
