import { Component, EventEmitter, Inject, OnInit, Output, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

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
  subscription!: Subscription;

  createColumnForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50), this.customValidator]],
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

  onSubmit(ngForm: FormGroupDirective) {
    const { title } = this.createColumnForm.value;
    const order = this.orders.length ? Math.max(...this.orders) + this.orderStep : this.orderStep;
    console.log({ order }, this.orderStep);
    const boardId = this.configDialog.routeParameteres?.boardId as string;
    console.log({ title, order, boardId });
    this.store.dispatch(ColumnsActions.createColumn({ column: { title, order, boardId } }));
    this.createColumnForm.reset();
    ngForm.resetForm();
  }

  private customValidator(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}