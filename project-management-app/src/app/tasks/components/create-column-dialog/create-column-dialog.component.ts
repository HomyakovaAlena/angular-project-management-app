import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-create-column-dialog',
  templateUrl: './create-column-dialog.component.html',
  styleUrls: ['./create-column-dialog.component.scss'],
})
export class CreateColumnDialogComponent implements OnInit, OnDestroy {
  value = 'Column #1';
  orderStep = 65536;
  columnsList$ = this.store.select(fromColumns.getColumns);
  orders: number[] = [];
  titleErrors: string[] | undefined = [];
  subscription!: Subscription;

  createColumnForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateColumnDialogComponent>,
    private store: Store<fromColumns.ColumnsState>,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
  ) {}

  ngOnInit(): void {
    this.subscription = this.columnsList$.subscribe((columns) => {
      this.orders = columns.length ? columns.map((column) => column.order) : [];
      console.log(this.orders);
    });
  }

  getTitleErrorMessage() {
    this.titleErrors = ValidationService.getFormControlErrors(this.createColumnForm, 'title');
  }

  onSubmit(ngForm: FormGroupDirective) {
    const { title } = this.createColumnForm.value;
    const order = this.orders.length ? Math.max(...this.orders) + this.orderStep : this.orderStep;
    const boardId = this.configDialog.parameters?.boardId as string;
    this.store.dispatch(ColumnsActions.createColumn({ column: { title, order, boardId } }));
    this.createColumnForm.reset();
    ngForm.resetForm();
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
