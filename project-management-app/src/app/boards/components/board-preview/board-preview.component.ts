import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit {
  @Input() board: Board | null = null;
  constructor() {}

  ngOnInit(): void {}
}
