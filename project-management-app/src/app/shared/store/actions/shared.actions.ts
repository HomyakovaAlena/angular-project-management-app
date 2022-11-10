import { MatDialogConfig } from '@angular/material/dialog';
import { createAction, props } from '@ngrx/store';
import { ModalData } from '../../models/shared.model';

export const openDialog = createAction(
  '[Confirmation Dialog] Open Confirmation Dialog ',
  props<{ data?: MatDialogConfig<ModalData> | null | undefined }>(),
);
export const confirmDialog = createAction(
  '[Confirmation Dialog] Confirm Action in Dialog ',
  props<{ data?: ModalData | undefined | null }>(),
);
export const confirmDialogSuccess = createAction(
  '[Confirmation Dialog] Confirm Action in Dialog '
);
export const confirmDialogFailed = createAction(
  '[Confirmation Dialog] Confirm Action in Dialog ', props<{ error?: Error }>(),
);
export const closeDialog = createAction(
  '[Confirmation Dialog] Close Confirmation Dialog '
);

export const openSnackBar = createAction(
  '[Snack-bar] Open Snack-bar',
  props<{ message: string }>(),
);
