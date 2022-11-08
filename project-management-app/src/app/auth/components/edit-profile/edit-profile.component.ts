import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private authFacade: AuthFacade) { }

  ngOnInit(): void {
    // console.log('get user', this.authFacade.getAuthUser());

  }

}
