import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';
import { AuthFacade } from './auth/store/auth.facade';
import * as fromRoot from './store/reducers/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading$ = this.store.select(fromRoot.getIsLoading).pipe(debounceTime(0));

  constructor(
    private store: Store<fromRoot.AppState>,
    private authFacade: AuthFacade,
  ) // private cdr: ChangeDetectorRef,
  {}

  ngOnInit(): void {
    this.authFacade.authIfTokenNotExpired();
  }
  // ngAfterViewChecked() {
  //   this.cdr.detectChanges();
  // }
}
