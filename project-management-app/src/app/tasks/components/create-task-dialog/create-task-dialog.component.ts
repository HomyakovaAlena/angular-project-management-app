import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Column, Task } from '../../models/tasks.model';
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
import * as fromTasks from '../..//store/reducers/tasks.reducer';
import * as TasksActions from '../../store/actions/tasks.actions';
import { ModalData } from 'src/app/shared/models/shared.model';
import { User } from 'src/app/auth/models/user.model';
import * as fromUsers from '../../../users/store/reducers/users.reducer';
import * as UsersActions from '../../../users/store/actions/users.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit {
  value1 = 'Task #1';
  value2 = 'Description #1';
  orderStep = 65536;
  user$ = this.authFacade.user$;
  usersList$ = this.store.select(fromUsers.getUsers);
  userId: string | undefined = '';
  selectedUsers: User[] = [];
  tasksList$ = this.store.select(fromTasks.getTasks);
  orders: number[] = [];
  order = 65536;
  subscription!: Subscription;

  // @Output() createTask = new EventEmitter<Task>();

  createTaskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50), this.customValidator]],
    description: ['', [Validators.required, Validators.maxLength(50), this.customValidator]],
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

  ngOnInit(): void {
    this.subscription = this.tasksList$.subscribe((tasks) => {
      tasks.forEach((task) => {
        if (task.columnId === this.configDialog.routeParameteres?.columnId)
          this.orders.push(task.order);
      });
    });
  }

  onSubmit(ngForm: FormGroupDirective) {
    const { title, description } = this.createTaskForm.value;
    const order = this.orders.length ? Math.max(...this.orders) + this.orderStep : this.orderStep;

    const boardId = this.configDialog.routeParameteres?.boardId as string;
    const columnId = this.configDialog.routeParameteres?.columnId as string;

    this.usersStore.dispatch(UsersActions.loadUsers());
    this.user$.subscribe((user) => (this.userId = user?._id));
    const userId = this.userId as string;
    const users = this.selectedUsers.map((user) => user._id) as string[];

    this.store.dispatch(
      TasksActions.createTask({
        task: { title, description, order, boardId, columnId, userId, users },
      }),
    );
    this.createTaskForm.reset();
    ngForm.resetForm();
  }

  private customValidator(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  closeModal() {
    this.dialogRef.close();
  }

  selected(eventData: { selectedUsers: User[] }) {
    this.selectedUsers = eventData.selectedUsers;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
