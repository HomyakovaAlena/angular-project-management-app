import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  @Input() public boardsList: Board[] | null | undefined = [];
  @Input() public user: User | null | undefined;
  @Input() public users: User[] | null | undefined;
  @Output() protected deleteBoard = new EventEmitter<Board | null>();

  constructor() {}
  ngOnInit(): void {}

  protected onDelete(board: Board | null | undefined): void {
    this.deleteBoard.emit(board);
  }
}
