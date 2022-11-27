import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'users';

  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}`);
  }

  public getUserById(id: string | undefined): Observable<User> {
    return this.httpClient.get<User>(`users/${id}`);
  }

  public searchUsers(term: string): Observable<User[]> {
    const searchMessage = document.getElementById('search-message') as HTMLElement;
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient
      .get<User[]>(`${this.url}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? (searchMessage.textContent = $localize`found ${x.length}:users_count: user(s) matching "${term}:term:"`)
            : (searchMessage.textContent = $localize`no users matching "${term}:term:"`),
        ),
      );
  }
}
