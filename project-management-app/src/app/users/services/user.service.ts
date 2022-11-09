import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { User } from 'src/app/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    console.log(this.url);
    return this.httpClient.get<User[]>(`${this.url}`);
  }

  getUserById(id: string | undefined): Observable<User> {
    return this.httpClient.get<User>(`users/${id}`);
  }

  searchUsers(term: string): Observable<User[]> {
    const searchMessage = document.getElementById('search-message') as HTMLElement;
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient.get<User[]>(`${this.url}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? (searchMessage.textContent = `found ${x.length} user(s) matching "${term}"`)
          : (searchMessage.textContent = `no users matching "${term}"`),
      ),
      // catchError(this.handleError<User[]>('searchUsers', [])),
    );
  }
}
