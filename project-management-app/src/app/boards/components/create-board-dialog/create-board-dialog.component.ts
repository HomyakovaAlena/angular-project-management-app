import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import { ModalData } from 'src/app/shared/models/shared.model';
import { User } from 'src/app/auth/models/user.model';
import * as fromUsers from '../../../users/store/reducers/users.reducer';
import * as UsersActions from '../../../users/store/actions/users.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent implements OnInit {
  value = 'Canban Board #1'
  user$ = this.authFacade.user$;
  owner: string | undefined = '';
  @Output() createBoard = new EventEmitter<Board>();
  usersList$ = this.store.select(fromUsers.getUsers);
  selectedUsers: User[] = [];

  createBoardForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50), this.customValidator]],
    users: [''],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateBoardDialogComponent>,
    private store: Store<fromBoards.BoardsState>,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
    private usersStore: Store<fromUsers.UsersState>,
    private authFacade: AuthFacade,
  ) {
    console.log(configDialog, 'from constructor');
  }

  ngOnInit(): void {}

  onSubmit(ngForm: FormGroupDirective) {
    this.usersStore.dispatch(UsersActions.loadUsers());
    const { title } = this.createBoardForm.value;
    this.user$.subscribe((user) => (this.owner = user?._id));
    const owner = this.owner as string;
    const users = this.selectedUsers.map((user) => user._id) as string[];
    this.store.dispatch(BoardsActions.createBoard({ board: { title, owner, users } }));
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

  selected(eventData: { selectedUsers: User[] }) {
    this.selectedUsers = eventData.selectedUsers;
  }
}
