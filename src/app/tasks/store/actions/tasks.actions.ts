import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/tasks.model';

export const loadTasks = createAction('[loadTasks] Load', props<{ boardId: string }>());
export const loadTasksSuccess = createAction('[Tasks] Load Success', props<{ tasks: Task[] }>());
export const loadTasksFailed = createAction(
  '[Tasks] Load Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const createTask = createAction('[Tasks] Add Task', props<{ task: Task }>());
export const createTaskSuccess = createAction('[Tasks] Add Task Success', props<{ task: Task }>());
export const createTaskFailed = createAction(
  '[Tasks] Add Task Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const updateTask = createAction('[Tasks] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>(),
);
export const updateTaskFailed = createAction(
  '[Tasks] Update Task Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ boardId: string; columnId: string; taskId: string }>(),
);
export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ boardId: string; columnId: string; taskId: string }>(),
);
export const deleteTaskFailed = createAction(
  '[Tasks] Delete Task Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const changeTasksOrder = createAction(
  '[Tasks] Change Task Order',
  props<{ tasksArray: { _id: string; order: number; columnId: string }[] }>(),
);
export const changeTasksOrderSuccess = createAction(
  '[Tasks] Change Task Order Success',
  props<{ tasksArray: { _id: string; order: number; columnId: string }[] }>(),
);
export const changeTasksOrderFailed = createAction(
  '[Tasks] Change Task Order Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getTaskById = createAction(
  '[Tasks] Get task by id',
  props<{
    boardId: string;
    columnId: string;
    taskId: string;
  }>(),
);
export const getTaskByIdSuccess = createAction(
  '[Tasks]  Get task by id Success',
  props<{ task: Task }>(),
);
export const getTaskByIdFailed = createAction(
  '[Tasks]  Get task by id Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const resetTasksState = createAction('[Tasks] Reset Tasks State');
