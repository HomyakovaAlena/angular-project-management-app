import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {}

  isLoading$ = this.authFacade.isLoadingLogin$;
  showLoginError$ = this.authFacade.hasLoginError$;

}
