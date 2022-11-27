import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalData } from 'src/app/shared/models/shared.model';
import { User } from 'src/app/auth/models/user.model';
import * as fromTasks from '../..//store/reducers/tasks.reducer';
import * as TasksActions from '../../store/actions/tasks.actions';
import * as fromUsers from '../../../users/store/reducers/users.reducer';
import * as UsersActions from '../../../users/store/actions/users.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit, OnDestroy {
  private readonly orderStep = 65536;
  private orders: number[] = [];

  protected title: string | undefined | null = '';
  protected description: string | undefined | null = '';

  protected userId: string | undefined = '';
  protected selectedUsers: User[] = [];
  protected user$ = this.authFacade.user$;
  protected usersList$ = this.store.select(fromUsers.getUsers);
  protected tasksList$ = this.store.select(fromTasks.getTasks);
  protected selectedTask$ = this.store.select(fromTasks.getTaskById);

  protected titleErrors: string[] | undefined = [];
  protected descriptionErrors: string[] | undefined = [];

  private subscription1!: Subscription;
  private subscription2!: Subscription;

  protected createTaskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    users: [''],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private store: Store<fromTasks.TasksState>,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
    private usersStore: Store<fromUsers.UsersState>,
    private authFacade: AuthFacade,
  ) {}

  initTaskEditing() {
    this.store.dispatch(
      TasksActions.getTaskById({
        boardId: this.configDialog.parameters?.boardId,
        columnId: this.configDialog.parameters?.columnId,
        taskId: this.configDialog.itemId,
      }),
    );
    this.subscription2 = this.selectedTask$.subscribe((task) => {
      this.title = task?.title;
      this.description = task?.description;
      this.setValue();
    });
  }

  initTaskCreation() {
    this.title = $localize`Task #1`;
    this.description = $localize`Description #1`;
    this.setValue();
  }

  ngOnInit(): void {
    if (this.configDialog.itemId) {
      this.initTaskEditing();
    } else {
      this.initTaskCreation();
    }
    this.subscription1 = this.tasksList$.subscribe((tasks) => {
      tasks.forEach((task) => {
        if (task.columnId === this.configDialog.parameters?.columnId) this.orders.push(task.order);
      });
    });
  }

  protected setValue(): void {
    this.createTaskForm.patchValue({
      title: this.title,
      description: this.description,
    });
  }

  protected getTitleErrorMessage(): void {
    this.titleErrors = ValidationService.getFormControlErrors(this.createTaskForm, 'title');
  }

  protected getDescriptionErrorMessage(): void {
    this.descriptionErrors = ValidationService.getFormControlErrors(
      this.createTaskForm,
      'description',
    );
  }

  protected onSubmit(ngForm: FormGroupDirective): void {
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
    this.user$.subscribe((user) => (this.userId = user?._id));
    const userId = this.userId as string;
    const users = this.selectedUsers.map((user) => user._id) as string[];
    const _id = this.configDialog.itemId;
    return { title, description, order, boardId, columnId, userId, users, _id };
  }

  protected confirmAction(): void {
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

  protected selected(eventData: { selectedUsers: User[] }): void {
    this.selectedUsers = eventData.selectedUsers;
  }

  protected closeModal(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription1) this.subscription1.unsubscribe();
    if (this.subscription2) this.subscription2.unsubscribe();
  }
}
