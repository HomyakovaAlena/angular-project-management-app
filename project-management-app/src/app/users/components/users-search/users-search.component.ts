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

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss'],
})
export class UsersSearchComponent implements OnInit {
  users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();

  @Input() parentGroup!: FormGroup;
  @Input() controlName!: string;
  selectedUsers: User[] = [];
  user!: User;
  @Output() selectedUsersIdsFromChild = new EventEmitter<{
    selectedUsers: User[];
  }>();

  @ViewChild('usersInput') usersInput!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService) {}

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

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  remove(selectedUser: User): void {
    const index = this.selectedUsers.indexOf(selectedUser);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(user: User): void {
    this.selectedUsers.push(user);
    this.selectedUsersIdsFromChild.emit({
      selectedUsers: this.selectedUsers,
    });
    this.usersInput.nativeElement.value = '';
    const searchMessage = document.getElementById('search-message') as HTMLElement;
    searchMessage.textContent = '';
    this.ngOnInit();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedUsers, event.previousIndex, event.currentIndex);
  }
}
