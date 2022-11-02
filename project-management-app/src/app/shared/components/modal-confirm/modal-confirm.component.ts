import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SharedService } from '../../services/shared.service';
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
    @Inject(MAT_DIALOG_DATA) public configDialog: MatDialogConfig<ModalData>,
    private sharedService: SharedService,
    private store: Store,
  ) {
    console.log(this.configDialog, 'from modal data');
  }

  actionFunction() {
    this.store.dispatch(SharedActions.confirmDialog({ data: this.configDialog['data'] }));
  }

  closeModal() {
    this.dialogRef.close();
  }
}
