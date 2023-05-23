import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as ColumnsActions from '../actions/columns.actions';
import { Column } from '../../models/tasks.model';

export interface ColumnsState {
  columns: Column[];
}

export const initialState: ColumnsState = {
  columns: [],
};

export const columnsReducer = createReducer(
  initialState,
  on(ColumnsActions.loadColumnsSuccess, (state, { columns }) => ({
    ...state,
    columns,
  })),
  on(ColumnsActions.createColumnSuccess, (state, { column }) => ({
    ...state,
    columns: [...state.columns, column],
  })),
  on(ColumnsActions.updateColumnSuccess, (state, { column }) => ({
    ...state,
    columns: [...state.columns.filter((columnExisted) => columnExisted._id !== column._id), column],
  })),
  on(ColumnsActions.deleteColumnSuccess, (state, { boardId, columnId }) => ({
    ...state,
    columns: [...state.columns.filter((column) => column._id !== columnId)],
  })),
  on(ColumnsActions.changeColumnsOrderSuccess, (state, { columnsArray }) => ({
    ...state,
    columns: [
      ...state.columns.map((column) => {
        const columnFound = columnsArray.filter(
          (filteredColumn) => filteredColumn._id === column._id,
        );
        if (columnFound.length) {
          column = { ...column, order: columnFound[0].order };
        }
        return column;
      }),
    ],
  })),
  on(ColumnsActions.resetColumnsState, (state) => ({
    ...initialState,
  })),
);

export const getColumnsState = createFeatureSelector<ColumnsState>('columns');
export const getColumns = createSelector(getColumnsState, (state: ColumnsState) => state.columns);
