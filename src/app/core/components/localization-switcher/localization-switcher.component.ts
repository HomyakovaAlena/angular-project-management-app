import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

interface Locales {
  code: string;
  name: string;
}

@Component({
  selector: 'app-localization-switcher',
  templateUrl: './localization-switcher.component.html',
  styleUrls: ['./localization-switcher.component.scss'],
})
export class LocalizationSwitcherComponent {
  public selectedLocale: string = location.pathname.includes('/angular-project-management-app/ru')
    ? 'ru'
    : 'en';

  locales: Locales[] = [
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' },
  ];

  selected(event: MatSelectChange) {
    const code = this.selectedLocale;
    location.replace(`/angular-project-management-app/${code}/`);
  }
}
