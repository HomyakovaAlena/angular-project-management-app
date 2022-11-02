import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  @Input() boardsList: Board[] | null = [];
  @Output() deleteBoard = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void { }

  onDelete(id: string) {
    this.deleteBoard.emit(id);
  }
}
