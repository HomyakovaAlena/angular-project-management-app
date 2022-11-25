import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
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
        console.log('check if login in no-auth-guard');
        if (isLoggedIn) {
          console.log('is LoggedIn in guard so go to boards');
          this.router.navigateByUrl('/boards');
        }
        return !isLoggedIn;
      }),
    );
  }
}
