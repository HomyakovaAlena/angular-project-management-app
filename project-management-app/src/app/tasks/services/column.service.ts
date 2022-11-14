import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Column } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private url = 'columns';
  private boardsUrl = 'boards';

  constructor(private httpClient: HttpClient) {}

  getColumns(boardId: string | undefined): Observable<Column[]> {
    const url = `${this.boardsUrl}/${boardId}/${this.url}`;
    return this.httpClient.get<Column[]>(url);
  }

  getColumnById(boardId: string | undefined, columnId: string): Observable<Column> {
    const url = `${this.boardsUrl}/${boardId}/${this.url}/${columnId}`;
    return this.httpClient.get<Column>(url);
  }

  createColumn(column: Column): Observable<Column> {
    const { boardId, title, order } = column;
    const url = `${this.boardsUrl}/${boardId}/${this.url}`;
    return this.httpClient.post<Column>(url, { title, order });
  }

  updateColumn(column: Column): Observable<Column> {
    const { boardId, _id, title, order } = column;
    const url = `${this.boardsUrl}/${boardId}/${this.url}/${_id}`;
    return this.httpClient.put<Column>(url, {
      title,
      order,
    });
  }

  deleteColumn(boardId: string | undefined, columnId: string) {
    const url = `${this.boardsUrl}/${boardId}/${this.url}/${columnId}`;
    return this.httpClient.delete<Column>(url);
  }
}
