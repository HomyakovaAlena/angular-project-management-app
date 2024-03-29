import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './store/effects/shared.effects';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { TasksByColumnsPipe } from './pipes/tasks-by-columns.pipe';
import { UsernameByIdPipe } from './pipes/username-by-id.pipe';
import { TasksSearchComponent } from './components/tasks-search/tasks-search.component';

@NgModule({
  declarations: [
    ModalConfirmComponent,
    SnackBarComponent,
    TasksByColumnsPipe,
    UsernameByIdPipe,
    TasksSearchComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([SharedEffects]),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  exports: [ModalConfirmComponent, TasksByColumnsPipe, UsernameByIdPipe, TasksSearchComponent],
})
export class SharedModule {}
