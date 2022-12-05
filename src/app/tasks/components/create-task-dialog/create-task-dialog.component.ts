import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { ModalData } from 'src/app/shared/models/shared.model';
import { User } from 'src/app/auth/models/user.model';
import * as fromTasks from '../../store/reducers/tasks.reducer';
import * as TasksActions from '../../store/actions/tasks.actions';
import * as fromUsers from '../../../users/store/reducers/users.reducer';
import * as UsersActions from '../../../users/store/actions/users.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { Task } from 'src/app/tasks/models/tasks.model';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit, OnDestroy {
  private orderStep = 65536;
  private orders: number[] = [];
  title: string = '';
  description: string = '';

  userId: string = '';
  selectedUsers: User[] = [];
  user$ = this.authFacade.user$;
  usersList$ = this.store.select(fromUsers.getUsers);
  tasksList$ = this.store.select(fromTasks.getTasks);
  selectedTask$ = this.store.select(fromTasks.getTaskById);
  taskSubscription$!: Observable<Task | undefined>;
  tasksListSubscription!: Subscription;

  titleErrors: string[] = [];
  descriptionErrors: string[] = [];
  createTaskForm!: FormGroup;

  initForm() {
    this.createTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      users: [''],
    });
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private store: Store<fromTasks.TasksState>,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
    private usersStore: Store<fromUsers.UsersState>,
    private authFacade: AuthFacade,
  ) {}

  initTaskEditing() {
    if (!this.configDialog.parameters || !this.configDialog.itemId) return;
    this.store.dispatch(
      TasksActions.getTaskById({
        boardId: this.configDialog.parameters.boardId as string,
        columnId: this.configDialog.parameters.columnId as string,
        taskId: this.configDialog.itemId,
      }),
    );
    this.taskSubscription$ = this.selectedTask$.pipe(
      tap((task) => {
        if (!task) return;
        this.title = task.title;
        this.description = task.description;
        this.setValue();
      }),
    );
  }

  initTaskCreation() {
    this.title = $localize`Task #1`;
    this.description = $localize`Description #1`;
    this.setValue();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.configDialog.itemId) {
      this.initTaskEditing();
    } else {
      this.initTaskCreation();
    }
    this.getOrders();
  }

  setValue(): void {
    this.createTaskForm.patchValue({
      title: this.title,
      description: this.description,
    });
  }

  getOrders() {
    this.tasksListSubscription = this.tasksList$
      .pipe(
        tap((tasks) => {
          tasks.forEach((task) => {
            if (task.columnId === this.configDialog.parameters?.columnId)
              this.orders.push(task.order);
          });
        }),
      )
      .subscribe();
  }

  getTitleErrorMessage(): void {
    this.titleErrors = ValidationService.getFormControlErrors(this.createTaskForm, 'title');
  }

  getDescriptionErrorMessage(): void {
    this.descriptionErrors = ValidationService.getFormControlErrors(
      this.createTaskForm,
      'description',
    );
  }

  onSubmit(ngForm: FormGroupDirective): void {
    this.confirmAction();
    this.createTaskForm.reset();
    ngForm.resetForm();
  }

  private getTaskData() {
    const { title, description } = this.createTaskForm.value;
    const order = this.orders.length ? Math.max(...this.orders) + this.orderStep : this.orderStep;
    const boardId = this.configDialog.parameters?.boardId as string;
    const columnId = this.configDialog.parameters?.columnId as string;

    this.usersStore.dispatch(UsersActions.loadUsers());
    this.user$.subscribe((user) => (this.userId = user?._id as string));
    const users = this.selectedUsers.map((user) => user._id) as string[];
    const _id = this.configDialog.itemId;
    return {
      title,
      description,
      order,
      boardId,
      columnId,
      userId: this.userId as string,
      users,
      _id,
    };
  }

  confirmAction(): void {
    const { title, description, order, boardId, columnId, userId, users, _id } = this.getTaskData();
    const action = this.configDialog.name;

    action === 'createTask'
      ? this.store.dispatch(
          TasksActions.createTask({
            task: { title, description, order, boardId, columnId, userId, users },
          }),
        )
      : this.store.dispatch(
          TasksActions.updateTask({
            task: {
              title,
              description,
              order: this.configDialog.parameters?.order as number,
              boardId,
              columnId,
              userId,
              users,
              _id,
            },
          }),
        );
  }

  selected(eventData: { selectedUsers: User[] }): void {
    this.selectedUsers = eventData.selectedUsers;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.tasksListSubscription) this.tasksListSubscription.unsubscribe();
  }
}
