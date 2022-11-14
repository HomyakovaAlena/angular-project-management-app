import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from '../actions/tasks.actions';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  finalize,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromRoot from '../../../store/reducers/app.reducer';
import * as AppActions from '../../../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private taskService: TaskService,
    public dialog: MatDialog,
  ) {}

  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ boardId, columnId }) =>
        this.taskService.getTasks(boardId, columnId).pipe(
          map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TasksActions.loadTasksFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ task }) =>
        this.taskService.createTask(task).pipe(
          map((task) => TasksActions.createTaskSuccess({ task })),
          catchError((error) => of(TasksActions.createTaskFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ boardId, columnId, taskId }) =>
        this.taskService.deleteTask(boardId, columnId, taskId).pipe(
          map(() => TasksActions.deleteTaskSuccess({ boardId, columnId, taskId })),
          catchError((error) => of(TasksActions.deleteTaskFailed({ error }))),
          finalize(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: false }))),
        ),
      ),
    ),
  );

  onSuccededActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TasksActions.createTaskSuccess,
          TasksActions.deleteTaskSuccess,
          TasksActions.updateTaskSuccess,
        ),
        tap(() => {
          this.store.dispatch(SharedActions.closeDialog());
          this.store.dispatch(SharedActions.openSnackBar({ message: 'Success!' }));
        }),
      ),
    { dispatch: false },
  );

  onFailedActions$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          TasksActions.deleteTaskFailed,
          TasksActions.createTaskFailed,
          TasksActions.loadTasksFailed,
          TasksActions.updateTaskFailed,
        ),
        tap(({ error }) => {
          console.log(error);
          this.store.dispatch(
            SharedActions.openSnackBar({ message: `Failed, reason: ${error.message}` }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
