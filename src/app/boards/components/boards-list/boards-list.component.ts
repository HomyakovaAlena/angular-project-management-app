import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  @Input() public boardsList!: Board[] | null;
  @Output() deleteBoard = new EventEmitter<Board>();

  constructor() {}
  ngOnInit(): void {}

  onDelete(board: Board): void {
    this.deleteBoard.emit(board);
  }
}
