import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { UserService } from '../../services/user.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss'],
})
export class UsersSearchComponent implements OnInit {
  users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input() parentGroup!: FormGroup;
  @Input() controlName!: string;
  @Output() selectedUsersIdsFromChild = new EventEmitter<{
    selectedUsers: User[];
  }>();
  selectedUsers: User[] = [];
  user!: User;

  @ViewChild('usersInput') usersInput!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private store: Store) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      filter((text) => text.length > 1),
      debounceTime(50),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }

  remove(selectedUser: User): void {
    const index = this.selectedUsers.indexOf(selectedUser);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(user: User): void {
    if (!this.selectedUsers.some((selectedUser) => selectedUser._id === user._id)) {
      this.selectedUsers.push(user);
    } else {
      this.store.dispatch(
        SharedActions.openSnackBar({ message: `User ${user.name} has already been selected` }),
      );
    }
    this.selectedUsersIdsFromChild.emit({
      selectedUsers: this.selectedUsers,
    });
    this.usersInput.nativeElement.value = '';
    const searchMessage = document.getElementById('search-message') as HTMLElement;
    searchMessage.textContent = '';
    this.ngOnInit();

    // this.editProfileForm.reset();
    // ngForm.resetForm();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedUsers, event.previousIndex, event.currentIndex);
  }
}
