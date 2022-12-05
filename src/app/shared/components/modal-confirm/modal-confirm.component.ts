import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as SharedActions from '../../store/actions/shared.actions';
import { ModalData } from '../../models/shared.model';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
  ) {}

  actionFunction(): void {
    this.store.dispatch(SharedActions.confirmDialog({ data: this.configDialog }));
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
