import { Component, Input, OnChanges } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import * as fromColumns from '../../store/reducers/columns.reducer';
import { Store } from '@ngrx/store';
import { Column } from '../../models/tasks.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import * as ColumnsActions from '../../store/actions/columns.actions';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-board-item-page',
  templateUrl: './board-item-page.component.html',
  styleUrls: ['./board-item-page.component.scss'],
})
export class BoardItemPageComponent implements OnChanges {
  @Input() public board!: Board;
  columnsList$ = this.store.select(fromColumns.getColumns);
  sortedColumnsList: Column[] = [];
  columnsSubscription$!: Observable<Column[]>;

  constructor(
    private store: Store<fromColumns.ColumnsState>,
    private sharedService: SharedService,
  ) {}

  ngOnChanges(): void {
    this.store.dispatch(ColumnsActions.loadColumns({ boardId: this.board._id as string }));
    this.sortColumns();
  }

  sortColumns() {
    this.columnsSubscription$ = this.columnsList$.pipe(
      tap((columnsList) => {
        this.sortedColumnsList = [...columnsList].sort((a: Column, b: Column) => a.order - b.order);
      }),
    );
  }

  openDialog(column: Column): void {
    if (!column) return;
    const { _id, title } = column;
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'confirmDelete',
      title: $localize`Are you sure you want to delete this item?`,
      description: $localize`If you confirm, the item ${title}:column_title: will be deleted.`,
      actionButtonText: $localize`Delete`,
      itemName: title,
      itemId: _id,
      action: 'deleteColumn',
      parameters: { boardId: this.board?._id },
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
