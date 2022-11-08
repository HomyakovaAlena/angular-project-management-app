import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthFacade } from 'src/app/auth/store/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appTitle = 'PM App';
  constructor(private authFacade: AuthFacade) {}
  isLoggedIn$ = this.authFacade.isLoggedIn$;
  user$ = this.authFacade.user$;

  ngOnInit(): void {
    console.log(this.user$, of(this.user$), 'user$ from header');
  }
}
