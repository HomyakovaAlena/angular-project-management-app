import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {}

  logout() {
    // console.log('get user', this.authFacade.getAuthUser());
    this.authFacade.logout();
    console.log('logged out');
  }
}
