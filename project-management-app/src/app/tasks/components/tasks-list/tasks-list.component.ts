import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Task, Column } from '../../models/tasks.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  @Input() tasksList: Task[] | null | undefined = [];
  @Input() column: Column | null | undefined = null;
  @Input() board: Board | null | undefined = null;
  @Output() deleteTask = new EventEmitter<Task | null>();

  constructor() {}

  ngOnInit(): void {}

  onDelete(task: Task | null | undefined) {
    this.deleteTask.emit(task);
  }
}
