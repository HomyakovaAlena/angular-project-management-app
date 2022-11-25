import { CdkDragDrop } from '@angular/cdk/drag-drop';
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

  deleteColumn(boardId: string | undefined, columnId: string): Observable<Column> {
    const url = `${this.boardsUrl}/${boardId}/${this.url}/${columnId}`;
    return this.httpClient.delete<Column>(url);
  }

  changeColumnsOrder(columnsArray: { _id: string; order: number }[]): Observable<Column> {
    const url = `${this.url}Set`;
    return this.httpClient.patch<Column>(url, columnsArray);
  }

  defineColumnOrder(
    columnsList: Column[],
    event: CdkDragDrop<string[]>,
  ): { draggedItemId: string; newOrder: number } {
    const orderStep = 65536;
    let newOrder: number;

    const from = event.previousIndex;
    const to = event.currentIndex;
    const toOrder = columnsList[to].order;

    if (from > to) {
      const beforeTo = event.currentIndex - 1;
      const beforeToOrder = beforeTo >= 0 ? columnsList[beforeTo].order : 0;
      newOrder = ((beforeToOrder + toOrder) / 2) as number;
    } else {
      const afterTo = event.currentIndex + 1;
      const afterToOrder =
        afterTo < columnsList.length ? columnsList[afterTo].order : toOrder + orderStep;
      newOrder = ((afterToOrder + toOrder) / 2) as number;
    }

    const draggedItemId = columnsList[from]._id as string;
    return { draggedItemId, newOrder };
  }
}
