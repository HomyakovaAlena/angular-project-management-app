import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/boards/models/board.model';
import { Column, Task } from '../../models/tasks.model';
import * as fromTasks from '../../store/reducers/tasks.reducer';
import * as TasksActions from '../../store/actions/tasks.actions';
import * as ColumnsActions from '../../store/actions/columns.actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit, OnChanges {
  @Input() public column!: Column;
  @Input() public board!: Board;
  @Output() deleteColumn = new EventEmitter<Column>();
  tasksList$ = this.store.select(fromTasks.getTasks);
  sortedTasksList: Task[] = [];
  formVisible: boolean = false;
  updateColumnForm!: FormGroup;
  taskSubscription$!: Observable<Task[]>;

  initForm() {
    this.updateColumnForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  constructor(
    private store: Store<fromTasks.TasksState>,
    private sharedService: SharedService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    this.store.dispatch(TasksActions.loadTasks({ boardId: this.board._id as string }));
    this.sortTasks();
  }

  sortTasks() {
    this.taskSubscription$ = this.tasksList$.pipe(
      tap((tasksList) => {
        this.sortedTasksList = [...tasksList].sort((a: Task, b: Task) => a.order - b.order);
      }),
    );
  }

  onDelete(): void {
    this.deleteColumn.emit(this.column);
  }

  openDialogForDelete(task: Task): void {
    if (!task) return;
    const { _id, title } = task;
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'confirmDelete',
      title: $localize`Are you sure you want to delete this item?`,
      description: $localize`If you confirm, the item ${title}:column_title: will be deleted.`,
      actionButtonText: $localize`Delete`,
      itemName: title,
      itemId: _id,
      action: 'deleteTask',
      parameters: { boardId: this.board?._id, columnId: this.column?._id },
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }

  openDialogForEdit(task: Task) {
    if (!task) return;
    const { _id, title } = task;
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'editTask',
      title: $localize`Editing task...`,
      description: $localize`Fill in the form to edit task.`,
      actionButtonText: $localize`Edit`,
      itemName: title,
      itemId: _id,
      action: 'editTask',
      parameters: { boardId: task.boardId, columnId: task.columnId, order: task.order },
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }

  onSubmit(ngForm: FormGroupDirective) {
    const { title } = this.updateColumnForm.value;
    const { _id, boardId, order } = this.column!;
    this.store.dispatch(ColumnsActions.updateColumn({ column: { title, order, _id, boardId } }));
    this.updateColumnForm.reset();
    ngForm.resetForm();
  }

  update() {
    this.formVisible = true;
    this.updateColumnForm.setValue({ title: this.column?.title });
  }

  cancel() {
    this.formVisible = false;
  }
}
