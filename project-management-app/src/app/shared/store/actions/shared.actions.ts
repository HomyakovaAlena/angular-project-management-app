import { createAction, props } from '@ngrx/store';
import { ModalData } from '../../models/shared.model';

export const openDialog = createAction(
  '[Confirmation Dialog] Open Confirmation Dialog ',
  props<{ data?: ModalData | null | undefined }>(),
);
export const confirmDialog = createAction(
  '[Confirmation Dialog] Confirm Action in Dialog ',
  props<{ data?: ModalData | undefined | null }>(),
);
export const closeDialog = createAction(
  '[Confirmation Dialog] Close Confirmation Dialog ',
  props<{ message: string }>(),
);
