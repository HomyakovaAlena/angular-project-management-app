import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'tasks';
  private columnsUrl = 'columns';
  private boardsUrl = 'boards';

  constructor(private httpClient: HttpClient) {}

  public getTasks(boardId: string): Observable<Task[]> {
    const url = `${this.url}Set/${boardId}`;
    return this.httpClient.get<Task[]>(url);
  }

  public getTaskById(boardId: string, columnId: string, taskId: string): Observable<Task> {
    const url = `${this.boardsUrl}/${boardId}/${this.columnsUrl}/${columnId}/${this.url}/${taskId}`;
    return this.httpClient.get<Task>(url);
  }

  public createTask(task: Task): Observable<Task> {
    const { title, description, order, users, userId, boardId, columnId } = task;
    const url = `${this.boardsUrl}/${boardId}/${this.columnsUrl}/${columnId}/${this.url}`;
    return this.httpClient.post<Task>(url, { title, description, order, users, userId });
  }

  public updateTask(task: Task): Observable<Task> {
    const { title, description, order, users, userId, boardId, columnId, _id } = task;
    const url = `${this.boardsUrl}/${boardId}/${this.columnsUrl}/${columnId}/${this.url}/${_id}`;
    return this.httpClient.put<Task>(url, {
      title,
      order,
      description,
      userId,
      columnId,
      users,
    });
  }

  public deleteTask(boardId: string, columnId: string, taskId: string) {
    const url = `${this.boardsUrl}/${boardId}/${this.columnsUrl}/${columnId}/${this.url}/${taskId}`;
    return this.httpClient.delete<Task>(url);
  }

  public changeTasksOrder(
    columnsArray: { _id: string; columnId: string; order: number }[],
  ): Observable<Task> {
    const url = `${this.url}Set`;
    return this.httpClient.patch<Task>(url, columnsArray);
  }

  public defineTaskOrder(taskList: Task[], event: CdkDragDrop<Task[]>): { newOrder: number } {
    const orderStep = 65536;
    let newOrder = 0;
    const from = event.previousIndex;
    const to = event.currentIndex;
    const beforeTo = event.currentIndex - 1;
    const afterTo = event.currentIndex + 1;
    const toOrder = taskList[to]?.order || orderStep;
    const beforeToOrder = beforeTo >= 0 ? taskList[beforeTo].order : 0;
    const afterToOrder = afterTo < taskList.length ? taskList[afterTo].order : toOrder + orderStep;

    if (event.previousContainer === event.container) {
      if (from > to) {
        newOrder = (beforeToOrder + toOrder) / 2;
      } else {
        newOrder = (afterToOrder + toOrder) / 2;
      }
    } else {
      newOrder = (beforeToOrder + toOrder) / 2;
    }
    return { newOrder };
  }

  public searchTasks(term: string): Observable<Task[]> {
    const searchMessage = document.getElementById('search-message') as HTMLElement;
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient
      .get<Task[]>(`${this.url}Set/?search=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? (searchMessage.textContent = $localize`found ${x.length}:found_quantity: task(s) matching "${term}:search_term:"`)
            : (searchMessage.textContent = $localize`no tasks matching "${term}:search_term:"`),
        ),
      );
  }
}
