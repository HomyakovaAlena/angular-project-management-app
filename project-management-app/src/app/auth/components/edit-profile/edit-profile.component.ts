import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}
  user$ = this.authFacade.user$;
  ngOnInit(): void {
    console.log(this.user$, of(this.user$), 'user$ from header');
  }
}
