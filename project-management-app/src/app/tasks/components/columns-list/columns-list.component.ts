import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Column } from '../../models/tasks.model';

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnInit {
  @Input() columnsList: Column[] | null | undefined = [];
  @Input() board: Board | null | undefined = null;
  @Output() deleteColumn = new EventEmitter<Column | null>();

  constructor() {}

  ngOnInit(): void {}

  onDelete(column: Column | null | undefined) {
    this.deleteColumn.emit(column);
  }
}
