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

  protected logout(): void {
    this.authFacade.logout();
  }
}
