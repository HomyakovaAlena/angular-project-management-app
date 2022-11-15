import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './store/effects/shared.effects';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { TasksByColumnsPipe } from './pipes/tasks-by-columns.pipe';
import { UsernameByIdPipe } from './pipes/username-by-id.pipe';

@NgModule({
  declarations: [ModalConfirmComponent, SnackBarComponent, TasksByColumnsPipe, UsernameByIdPipe],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSnackBarModule,
    // StoreModule.forFeature('shared', sharedReducer),
    EffectsModule.forFeature([SharedEffects]),
  ],
  exports: [ModalConfirmComponent, TasksByColumnsPipe, UsernameByIdPipe],
})
export class SharedModule {}
