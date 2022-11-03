import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import { ModalData } from 'src/app/shared/models/shared.model';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent {
  @Output() createBoard = new EventEmitter<Board>();

  createBoardForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    owner: ['', [Validators.required, this.customValidator]],
    users: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateBoardDialogComponent>,
    private store: Store<fromBoards.BoardsState>,
    @Inject(MAT_DIALOG_DATA) public configDialog: MatDialogConfig<ModalData>,
  ) {}

  onSubmit(ngForm: FormGroupDirective) {
    this.store.dispatch(BoardsActions.createBoard({board: { ...this.createBoardForm.value }}));
    this.createBoardForm.reset();
    ngForm.resetForm();
  }

  private customValidator(control: AbstractControl): ValidationErrors | null {
    // console.log(control);
    // return { customValue: true }
    return null;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
