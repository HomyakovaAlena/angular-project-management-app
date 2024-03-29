import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fromColumns from '../../store/reducers/columns.reducer';
import * as ColumnsActions from '../../store/actions/columns.actions';
import { ModalData } from 'src/app/shared/models/shared.model';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-create-column-dialog',
  templateUrl: './create-column-dialog.component.html',
  styleUrls: ['./create-column-dialog.component.scss'],
})
export class CreateColumnDialogComponent implements OnInit {
  private orderStep = 65536;
  columnsList$ = this.store.select(fromColumns.getColumns);
  private orders: number[] = [];
  titleErrors: string[] = [];
  title: string = $localize`Column #1`;
  createColumnForm!: FormGroup;
  columnsSubscription!: Subscription;

  initForm() {
    this.createColumnForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateColumnDialogComponent>,
    private store: Store<fromColumns.ColumnsState>,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setValue();
    this.getOrders();
  }

  setValue(): void {
    this.createColumnForm.setValue({
      title: this.title,
    });
  }

  getOrders() {
    this.columnsSubscription = this.columnsList$
      .pipe(
        tap((columns) => {
          this.orders = columns.length ? columns.map((column) => column.order) : [];
        }),
      )
      .subscribe();
  }

  getTitleErrorMessage(): void {
    this.titleErrors = ValidationService.getFormControlErrors(this.createColumnForm, 'title');
  }

  onSubmit(ngForm: FormGroupDirective): void {
    const { title } = this.createColumnForm.value;
    const order = this.orders.length ? Math.max(...this.orders) + this.orderStep : this.orderStep;
    const boardId = this.configDialog.parameters?.boardId as string;
    this.store.dispatch(ColumnsActions.createColumn({ column: { title, order, boardId } }));
    this.createColumnForm.reset();
    ngForm.resetForm();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.columnsSubscription.unsubscribe();
  }
}
