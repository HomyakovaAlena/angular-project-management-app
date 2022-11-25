import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as TasksActions from '../actions/tasks.actions';
import { Task } from '../../models/tasks.model';

export interface TasksState {
  tasks: Task[];
  selectedTask?: Task;
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
    tasks: [...state.tasks.filter((taskExisted) => taskExisted._id !== task._id), task],
  })),
  on(TasksActions.deleteTaskSuccess, (state, { boardId, columnId, taskId }) => ({
    ...state,
    tasks: [...state.tasks.filter((task) => task._id !== taskId)],
  })),
  on(TasksActions.getTaskByIdSuccess, (state, { task }) => ({
    ...state,
    selectedTask: task,
  })),
);

export const getTasksState = createFeatureSelector<TasksState>('tasks');
export const getTasks = createSelector(getTasksState, (state: TasksState) => state.tasks);
export const getTaskById = createSelector(getTasksState, (state: TasksState) => state.selectedTask);
