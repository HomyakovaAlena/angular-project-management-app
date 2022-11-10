import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  @Input() boardsList: Board[] | null | undefined = [];
  @Input() user: User | null | undefined;
  @Input() users: User[] | null | undefined;
  @Output() deleteBoard = new EventEmitter<Board | null>();

  constructor() {}

  ngOnInit(): void { }

  onDelete(board: Board | null | undefined) {
    this.deleteBoard.emit(board);
  }
}
