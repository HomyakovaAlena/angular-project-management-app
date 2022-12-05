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
import { tap } from 'rxjs';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent implements OnInit {
  @Output() createBoard = new EventEmitter<Board>();
  user$ = this.authFacade.user$;
  private owner: string = '';
  private selectedUsers: User[] = [];
  titleErrors: string[] = [];
  title: string = 'Canban Board #1';
  createBoardForm!: FormGroup;

  initForm() {
    this.createBoardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      users: [''],
    });
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateBoardDialogComponent>,
    private store: Store<fromBoards.BoardsState>,
    private usersStore: Store<fromUsers.UsersState>,
    private authFacade: AuthFacade,
    @Inject(MAT_DIALOG_DATA) public configDialog: ModalData,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setValue();
  }

  setValue(): void {
    this.createBoardForm.patchValue({
      title: this.title,
    });
  }

  getTitleErrorMessage(): void {
    this.titleErrors = ValidationService.getFormControlErrors(this.createBoardForm, 'title');
  }

  private getOwner(): void {
    this.usersStore.dispatch(UsersActions.loadUsers());
    this.user$
      .pipe(
        tap((user) => {
          if (!user) return;
          this.owner = user._id as string;
        }),
      )
      .subscribe();
  }

  selected(eventData: { selectedUsers: User[] }): void {
    this.selectedUsers = eventData.selectedUsers;
  }

  onSubmit(ngForm: FormGroupDirective): void {
    this.getOwner();
    const { title } = this.createBoardForm.value;
    const owner = this.owner as string;
    const users = this.selectedUsers.map((user) => user._id) as string[];
    this.store.dispatch(BoardsActions.createBoard({ board: { title, owner, users } }));
    this.createBoardForm.reset();
    ngForm.resetForm();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
