import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Column } from '../../models/tasks.model';

export const loadColumns = createAction('[loadColumns] Load', props<{ boardId: string }>());
export const loadColumnsSuccess = createAction(
  '[Columns] Load Success',
  props<{ columns: Column[] }>(),
);
export const loadColumnsFailed = createAction(
  '[Columns] Load Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const createColumn = createAction('[Columns] Add Column', props<{ column: Column }>());
export const createColumnSuccess = createAction(
  '[Columns] Add Column Success',
  props<{ column: Column }>(),
);
export const createColumnFailed = createAction(
  '[Columns] Add Column Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const updateColumn = createAction('[Columns] Update Column', props<{ column: Column }>());
export const updateColumnSuccess = createAction(
  '[Columns] Update Column Success',
  props<{ column: Column }>(),
);
export const updateColumnFailed = createAction(
  '[Columns] Update Column Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteColumn = createAction(
  '[Columns] Delete Column',
  props<{ boardId: string; columnId: string }>(),
);
export const deleteColumnSuccess = createAction(
  '[Columns] Delete Column Success',
  props<{ boardId: string; columnId: string }>(),
);
export const deleteColumnFailed = createAction(
  '[Columns] Delete Column Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const changeColumnsOrder = createAction(
  '[Columns] Change Column Order',
  props<{ columnsArray: { _id: string; order: number }[] }>(),
);
export const changeColumnsOrderSuccess = createAction(
  '[Columns] Change Column Order Success',
  props<{ columnsArray: { _id: string; order: number }[] }>(),
);
export const changeColumnsOrderFailed = createAction(
  '[Columns] Change Column Order Failed',
  props<{ error: HttpErrorResponse }>(),
);

export const resetColumnsState = createAction('[Columns] Reset Columns State');
