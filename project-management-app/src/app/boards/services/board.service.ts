import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  BoardsList: Board[] = [];
  private url = 'boards';

  constructor(private httpClient: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(this.url);
  }

  createBoard(board: Board): Observable<Board> {
    return this.httpClient.post<Board>(this.url, board);
  }

  deleteBoard(id: string) {
    const url = `${this.url}/${id}`;
    console.log(url,  this.httpClient.delete<Board>(url));
    return this.httpClient.delete<Board>(url);
  }

}
