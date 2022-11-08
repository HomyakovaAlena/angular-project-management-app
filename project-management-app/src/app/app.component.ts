import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';
import * as fromRoot from './store/reducers/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading$ = this.store.select(fromRoot.getIsLoading).pipe(debounceTime(0));

  constructor(private store: Store<fromRoot.AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
