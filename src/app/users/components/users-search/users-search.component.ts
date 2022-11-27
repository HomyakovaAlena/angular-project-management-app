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
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { UserService } from '../../services/user.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss'],
})
export class UsersSearchComponent implements OnInit {
  @Input() public parentGroup!: FormGroup;
  @Input() public controlName!: string;
  @Input() public boardUsersIds!: string | undefined;
  @Output() protected selectedUsersIdsFromChild = new EventEmitter<{
    selectedUsers: User[];
  }>();
  protected users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();
  protected addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  protected selectedUsers: User[] = [];
  protected user!: User;

  @ViewChild('usersInput') usersInput!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private store: Store) {}

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      filter((text) => text.length > 1),
      debounceTime(50),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }

  protected search(term: string): void {
    this.searchTerms.next(term);
  }

  protected remove(selectedUser: User): void {
    const index = this.selectedUsers.indexOf(selectedUser);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  protected select(user: User): void {
    if (!this.selectedUsers.some((selectedUser) => selectedUser._id === user._id)) {
      this.selectedUsers.push(user);
    } else {
      this.store.dispatch(
        SharedActions.openSnackBar({
          message: $localize`User ${user.name}:user_name: has already been selected`,
        }),
      );
    }
    this.selectedUsersIdsFromChild.emit({
      selectedUsers: this.selectedUsers,
    });
    this.usersInput.nativeElement.value = '';
    const searchMessage = document.getElementById('search-message') as HTMLElement;
    searchMessage.textContent = '';
    this.ngOnInit();
  }

  protected drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.selectedUsers, event.previousIndex, event.currentIndex);
  }
}
