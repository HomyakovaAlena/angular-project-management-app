import { Component, OnInit } from '@angular/core';
import { AuthFacade } from 'src/app/auth/store/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appTitle = $localize`PM App`;
  constructor(private authFacade: AuthFacade) {}
  isLoggedIn$ = this.authFacade.isLoggedIn$;

  ngOnInit(): void {}
}
