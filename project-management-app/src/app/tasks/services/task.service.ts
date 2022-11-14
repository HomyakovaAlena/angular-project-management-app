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

  getTasks(boardId: string | undefined, columnId: string | undefined): Observable<Task[]> {
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
}
