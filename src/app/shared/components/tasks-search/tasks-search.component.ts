import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { TaskService } from 'src/app/tasks/services/task.service';
import { Task } from 'src/app/tasks/models/tasks.model';
import { SharedService } from '../../services/shared.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-tasks-search',
  templateUrl: './tasks-search.component.html',
  styleUrls: ['./tasks-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TasksSearchComponent implements OnInit {
  protected tasks$!: Observable<Task[]>;
  private searchTerms = new Subject<string>();
  protected selectedTasks: Task[] = [];

  @ViewChild('tasksInput') tasksInput!: ElementRef<HTMLInputElement>;

  constructor(
    private taskService: TaskService,
    private store: Store,
    private sharedService: SharedService,
  ) {}

  protected search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.tasks$ = this.searchTerms.pipe(
      filter((text) => text.length > 1),
      debounceTime(50),
      distinctUntilChanged(),
      switchMap((term: string) => this.taskService.searchTasks(term)),
    );
    const searchMessage = document.getElementById('search-message') as HTMLElement;
    if (searchMessage) searchMessage.textContent = '';
  }

  protected selected(task: Task): void {
    this.tasksInput.nativeElement.value = '';
    const searchMessage = document.getElementById('search-message') as HTMLElement;
    searchMessage.textContent = '';

    if (!task) return;
    const { _id, title } = task;
    const dialogConfig = this.sharedService.createConfigDialog({
      name: `editTask`,
      title: $localize`Editing task...`,
      description: $localize`Fill in the form to edit task.`,
      actionButtonText: $localize`Edit`,
      itemName: title,
      itemId: _id,
      action: `editTask`,
      parameters: { boardId: task.boardId, columnId: task.columnId, order: task.order },
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
