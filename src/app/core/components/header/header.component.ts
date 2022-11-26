import { Component, OnInit } from '@angular/core';
import { AuthFacade } from 'src/app/auth/store/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  protected appTitle = $localize`PM App`;
  protected isLoggedIn$ = this.authFacade.isLoggedIn$;

  constructor(private authFacade: AuthFacade) {}
  ngOnInit(): void {}

  protected showSearch(event: Event) {
    event.stopImmediatePropagation();
    const tasksSearch = document.querySelector('.burger_tasks_search');
    tasksSearch?.classList.toggle('hidden');
    const headerWrapper = document.querySelector('.wrapper');
    headerWrapper?.classList.toggle('enlarge');
  }
}
