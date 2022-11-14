import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'tasks';
  private columnsUrl = 'columns';
  private boardsUrl = 'boards';

  constructor(private httpClient: HttpClient) {}

  getTasks(boardId: string | undefined): Observable<Task[]> {
    // const url = `${this.boardsUrl}/${boardId}/${this.columnsUrl}/${columnId}/${this.url}`;
    const url = `${this.url}Set/${boardId}`;
    return this.httpClient.get<Task[]>(url);
  }

  getTaskById(boardId: string | undefined, columnId: string, taskId: string): Observable<Task> {
    const url = `${this.boardsUrl}/${boardId}/${this.columnsUrl}/${columnId}/${this.url}/${taskId}`;
    return this.httpClient.get<Task>(url);
  }

  createTask(task: Task): Observable<Task> {
    const { title, description, order, users, userId, boardId, columnId } = task;
    const url = `${this.boardsUrl}/${boardId}/${this.columnsUrl}/${columnId}/${this.url}`;
    return this.httpClient.post<Task>(url, { title, description, order, users, userId });
  }

  updateTask(task: Task): Observable<Task> {
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

  deleteTask(boardId: string | undefined, columnId: string, taskId: string) {
    const url = `${this.boardsUrl}/${boardId}/${this.columnsUrl}/${columnId}/${this.url}/${taskId}`;
    return this.httpClient.delete<Task>(url);
  }

  changeTasksOrder(
    columnsArray: { _id: string; columnId: string; order: number }[],
  ): Observable<Task> {
    const url = `${this.url}Set`;
    return this.httpClient.patch<Task>(url, columnsArray);
  }

  defineTaskOrder(taskList: Task[], event: CdkDragDrop<Task[]>): { newOrder: number } {
    const orderStep = 65536;
    let newOrder = 0;
    const from = event.previousIndex;
    const to = event.currentIndex;
    const toOrder = taskList[to]?.order || orderStep;
    if (event.previousContainer === event.container) {
      if (from > to) {
        const beforeTo = event.currentIndex - 1;
        const beforeToOrder = beforeTo >= 0 ? taskList[beforeTo].order : 0;
        newOrder = ((beforeToOrder + toOrder) / 2) as number;
      } else {
        const afterTo = event.currentIndex + 1;
        const afterToOrder =
          afterTo < taskList.length ? taskList[afterTo].order : toOrder + orderStep;
        newOrder = ((afterToOrder + toOrder) / 2) as number;
      }
    } else {
      const beforeTo = event.currentIndex - 1;
      const beforeToOrder = beforeTo >= 0 ? taskList[beforeTo].order : 0;
      newOrder = ((beforeToOrder + toOrder) / 2) as number;
    }
    return { newOrder };
  }
}
