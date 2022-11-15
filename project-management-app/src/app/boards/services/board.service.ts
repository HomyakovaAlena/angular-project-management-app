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

  getBoards(userId: string | undefined): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`${this.url}Set/${userId}`);
  }

  getBoardById(boardId: string): Observable<Board> {
    const url = `${this.url}/${boardId}`;
    return this.httpClient.get<Board>(url);
  }

  createBoard(board: Board): Observable<Board> {
    return this.httpClient.post<Board>(this.url, board);
  }

  updateBoard(board: Board): Observable<Board> {
    const url = `${this.url}/${board._id}`;
    const { title, owner, users } = board;
    return this.httpClient.put<Board>(url, { title, owner, users });
  }

  deleteBoard(id: string) {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete<Board>(url);
  }
}
