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
// import { ActivatedRoute } from '@angular/router';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private taskService: TaskService,
    public dialog: MatDialog, // private route: ActivatedRoute,
  ) {}

  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ boardId }) =>
        this.taskService.getTasks(boardId).pipe(
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

  changeTasksOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.changeTasksOrder),
      tap(() => this.store.dispatch(AppActions.setLoadingState({ isLoading: true }))),
      switchMap(({ tasksArray }) =>
        this.taskService.changeTasksOrder(tasksArray).pipe(
          map(({}) => TasksActions.changeTasksOrderSuccess({ tasksArray })),
          catchError((error) => of(TasksActions.changeTasksOrderFailed({ error }))),
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
          TasksActions.changeTasksOrderSuccess,
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

  onFailedDrop$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TasksActions.changeTasksOrderFailed),
        tap(({ error }) => {
          console.log(error);
          // const id = this.route.snapshot.paramMap.get('id');
          // console.log(id);
          this.store.dispatch(
            SharedActions.openSnackBar({ message: `Failed, reason: ${error.message}` }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
