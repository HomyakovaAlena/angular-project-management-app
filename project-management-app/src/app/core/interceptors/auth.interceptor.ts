import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade, private tokenStorageService: TokenStorageService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenStorageService.getToken();
    // console.log({ accessToken }, '111 from interceptor');
    if (accessToken) {
      // console.log({ accessToken }, '222 from interceptor');
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
        // !Attention: it used only at Fake API, remove it in real app
        // params: req.params.set('auth-token', accessToken),
      });
    }

    return next.handle(req).pipe((s) => this.handleErrors(s, req.url));
  }

  private handleErrors(
    source: Observable<HttpEvent<unknown>>,
    urlPath: string,
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        // try to avoid errors on logout
        // therefore we check the url path of '/auth/'
        if (error.status === 401 && !urlPath.includes('/auth/')) {
          return this.handle401();
        }

        // rethrow error
        return throwError(() => error);
      }),
    );
  }

  private handle401() {
    this.authFacade.logout();
    return EMPTY;
  }
}
