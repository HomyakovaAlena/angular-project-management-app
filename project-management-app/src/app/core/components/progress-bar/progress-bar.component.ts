import { Component, Input, OnInit } from '@angular/core';

type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent{
  @Input() color = 'primary';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;

  onDOMContentLoaded() {
    this.mode = 'determinate';
    this.value = 100;
  }
}
