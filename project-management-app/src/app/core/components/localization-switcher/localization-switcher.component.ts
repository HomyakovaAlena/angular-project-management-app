import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localization-switcher',
  templateUrl: './localization-switcher.component.html',
  styleUrls: ['./localization-switcher.component.scss']
})
export class LocalizationSwitcherComponent implements OnInit {
  checked = false;
  constructor() { }

  ngOnInit(): void {
  }

}
