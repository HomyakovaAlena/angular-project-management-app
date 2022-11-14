import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as TasksActions from '../actions/tasks.actions';
import { Task } from '../../models/tasks.model';

// interface TasksMap {
//   columnId: string;
//   tasksByColumn: Task[];
// }

export interface TasksState {
  tasks: Task[];
}

export const initialState: TasksState = {
  tasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(TasksActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TasksActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TasksActions.deleteTaskSuccess, (state, { boardId, columnId, taskId }) => ({
    ...state,
    tasks: [...state.tasks.filter((task) => task._id !== taskId)],
  })),
);

export const getTasksState = createFeatureSelector<TasksState>('tasks');
export const getTasks = createSelector(getTasksState, (state: TasksState) => state.tasks);
