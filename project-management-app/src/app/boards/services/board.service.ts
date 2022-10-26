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

  // toggleComplete(changedBoard: Board): Observable<Board> {
  //   return this.httpClient.put<Board>(`${this.url}/${changedBoard.id}`, {
  //     ...changedBoard,
  //     isCompleted: !changedBoard.isCompleted,
  //   });
  // }
}
