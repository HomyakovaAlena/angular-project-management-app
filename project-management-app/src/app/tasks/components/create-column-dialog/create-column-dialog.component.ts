import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Column } from '../../models/tasks.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromColumns from '../..//store/reducers/columns.reducer';
import * as ColumnsActions from '../../store/actions/columns.actions';
import { ModalData } from 'src/app/shared/models/shared.model';

@Component({
  selector: 'app-create-column-dialog',
  templateUrl: './create-column-dialog.component.html',
  styleUrls: ['./create-column-dialog.component.scss'],
})
export class CreateColumnDialogComponent implements OnInit {
  value = 'Column #1';
  // board$!: Observable<ParamMap>;
  // private boardId: string | undefined = '';
  order = 1;

  // @Output() createColumn = new EventEmitter<Column>();

  createColumnForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50), this.customValidator]],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateColumnDialogComponent>,
    private store: Store<fromColumns.ColumnsState>,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
  ) {
    // console.log(configDialog, 'from constructor');
  }

  ngOnInit(): void {
  }

  onSubmit(ngForm: FormGroupDirective) {
    const { title } = this.createColumnForm.value;
    const order = this.order;
    this.order++;

    const boardId = this.configDialog.routeParameteres?.boardId as string;
    console.log({ title, order, boardId });
    this.store.dispatch(ColumnsActions.createColumn({ column: { title, order, boardId } }));
    this.createColumnForm.reset();
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

  // ngOnDestroy() {
  //   this.routeSub.unsubscribe();
  // }
  // selected(eventData: { selectedUsers: User[] }) {
  //   this.selectedUsers = eventData.selectedUsers;
  // }
}
