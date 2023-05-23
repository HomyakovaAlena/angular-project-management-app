import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import * as fromRoot from '../../store/reducers/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User | null> {
  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | null> {
    const authUserToken = this.tokenStorageService.getToken();
    return this.authService.getAuthUser({ token: authUserToken }).pipe(
      map((user) => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/auth/login']);
          return null;
        }
      }),
    );
  }
}
