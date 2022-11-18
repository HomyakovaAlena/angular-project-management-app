import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board.model';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import { ModalData } from 'src/app/shared/models/shared.model';
import { User } from 'src/app/auth/models/user.model';
import * as fromUsers from '../../../users/store/reducers/users.reducer';
import * as UsersActions from '../../../users/store/actions/users.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent implements OnInit {
  user$ = this.authFacade.user$;
  owner: string | undefined = '';
  @Output() createBoard = new EventEmitter<Board>();
  usersList$ = this.store.select(fromUsers.getUsers);
  selectedUsers: User[] = [];
  titleErrors: string[] | undefined = [];
  protected title: string | undefined = 'Canban Board #1';

  createBoardForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    users: [''],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateBoardDialogComponent>,
    private store: Store<fromBoards.BoardsState>,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
    private usersStore: Store<fromUsers.UsersState>,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit(): void {
    this.setValue();
  }

  setValue() {
    this.createBoardForm.patchValue({
      title: this.title,
    });
  }

  getTitleErrorMessage() {
    this.titleErrors = ValidationService.getFormControlErrors(this.createBoardForm, 'title');
  }

  getOwner() {
    this.usersStore.dispatch(UsersActions.loadUsers());
    this.user$.subscribe((user) => (this.owner = user?._id));
  }

  onSubmit(ngForm: FormGroupDirective) {
    this.getOwner();
    const { title } = this.createBoardForm.value;
    const owner = this.owner as string;
    const users = this.selectedUsers.map((user) => user._id) as string[];
    this.store.dispatch(BoardsActions.createBoard({ board: { title, owner, users } }));
    this.createBoardForm.reset();
    ngForm.resetForm();
  }

  closeModal() {
    this.dialogRef.close();
  }

  selected(eventData: { selectedUsers: User[] }) {
    this.selectedUsers = eventData.selectedUsers;
  }
}
