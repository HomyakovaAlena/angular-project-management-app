import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Column } from '../../models/tasks.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as fromColumns from '../../store/reducers/columns.reducer';
import { Store } from '@ngrx/store';
import * as ColumnsActions from '../../store/actions/columns.actions';
import { ColumnService } from '../../services/column.service';
@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnInit {
  @Input() columnsList: Column[] | null | undefined = [];
  @Input() board: Board | null | undefined = null;
  @Output() deleteColumn = new EventEmitter<Column | null>();

  constructor(
    private store: Store<fromColumns.ColumnsState>,
    private columnService: ColumnService,
  ) {}

  ngOnInit(): void {}

  onDelete(column: Column | null | undefined) {
    this.deleteColumn.emit(column);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (!this.columnsList) return;
    if (event.previousIndex === event.currentIndex) return;
    const { draggedItemId, newOrder } = this.columnService.defineColumnOrder(
      this.columnsList,
      event,
    );

    this.store.dispatch(
      ColumnsActions.changeColumnsOrder({
        columnsArray: [{ _id: draggedItemId, order: newOrder }],
      }),
    );

    moveItemInArray(this.columnsList, event.previousIndex, event.currentIndex);
  }
}
