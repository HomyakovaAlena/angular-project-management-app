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

  public getColumns(boardId: string | undefined): Observable<Column[]> {
    const url = `${this.boardsUrl}/${boardId}/${this.url}`;
    return this.httpClient.get<Column[]>(url);
  }

  public getColumnById(boardId: string | undefined, columnId: string): Observable<Column> {
    const url = `${this.boardsUrl}/${boardId}/${this.url}/${columnId}`;
    return this.httpClient.get<Column>(url);
  }

  public createColumn(column: Column): Observable<Column> {
    const { boardId, title, order } = column;
    const url = `${this.boardsUrl}/${boardId}/${this.url}`;
    return this.httpClient.post<Column>(url, { title, order });
  }

  public updateColumn(column: Column): Observable<Column> {
    const { boardId, _id, title, order } = column;
    const url = `${this.boardsUrl}/${boardId}/${this.url}/${_id}`;
    return this.httpClient.put<Column>(url, {
      title,
      order,
    });
  }

  public deleteColumn(boardId: string | undefined, columnId: string): Observable<Column> {
    const url = `${this.boardsUrl}/${boardId}/${this.url}/${columnId}`;
    return this.httpClient.delete<Column>(url);
  }

  public changeColumnsOrder(columnsArray: { _id: string; order: number }[]): Observable<Column> {
    const url = `${this.url}Set`;
    return this.httpClient.patch<Column>(url, columnsArray);
  }

  public defineColumnOrder(
    columnsList: Column[],
    event: CdkDragDrop<string[]>,
  ): { draggedItemId: string; newOrder: number } {
    const orderStep = 65536;
    let newOrder: number;
    const from = event.previousIndex;
    const to = event.currentIndex;
    const beforeTo = event.currentIndex - 1;
    const afterTo = event.currentIndex + 1;
    const toOrder = columnsList[to].order;
    const beforeToOrder = beforeTo >= 0 ? columnsList[beforeTo].order : 0;
    const afterToOrder =
      afterTo < columnsList.length ? columnsList[afterTo].order : toOrder + orderStep;

    if (from > to) {
      newOrder = ((beforeToOrder + toOrder) / 2);
    } else {
      newOrder = ((afterToOrder + toOrder) / 2);
    }

    const draggedItemId = columnsList[from]._id as string;
    return { draggedItemId, newOrder };
  }
}
