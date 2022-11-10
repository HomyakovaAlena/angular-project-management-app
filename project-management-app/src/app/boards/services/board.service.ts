import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private url = 'boards';

  constructor(private httpClient: HttpClient) {}

  getBoards(id: string| undefined): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`${this.url}Set/${id}`);
  }

  getBoardsByUser(id: string): Observable<Board[]> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Board[]>(url);
  }

  createBoard(board: Board): Observable<Board> {
    console.log({ board }, this.url);
    return this.httpClient.post<Board>(this.url, board);
  }

  deleteBoard(id: string) {
    const url = `${this.url}/${id}`;
    console.log(url, this.httpClient.delete<Board>(url));
    return this.httpClient.delete<Board>(url);
  }
}
