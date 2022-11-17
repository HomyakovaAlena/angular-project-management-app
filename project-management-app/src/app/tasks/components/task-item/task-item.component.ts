import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Task, Column } from '../../models/tasks.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() tasksList: Task[] | null | undefined = null;
  @Input() task: Task | null | undefined = null;
  @Input() column: Column | null | undefined = null;
  @Input() board: Board | null | undefined = null;
  @Output() deleteTask = new EventEmitter<Task | null>();
  @Output() editTask = new EventEmitter<Task | null>();

  constructor() {}
  ngOnInit(): void {}

  onDelete() {
    this.deleteTask.emit(this.task);
  }

  onEdit() {
    this.editTask.emit(this.task);
  }

  showMore(event: MouseEvent) {
    event.stopPropagation();
    const showMoreButton = event?.currentTarget as HTMLElement;
    const chipList = showMoreButton.closest('.task-item__mat-chip-list') as HTMLElement;
    const chipsContainer = chipList.querySelector('.task-item__chips-container') as HTMLElement;
    chipsContainer.classList.toggle('task-item__chips-container__full');
  }
}
