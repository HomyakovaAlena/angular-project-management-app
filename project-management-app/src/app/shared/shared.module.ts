import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedService } from './services/shared.service';
// import { sharedReducer } from './store/reducers/shared.reducer';
import { SharedEffects } from './store/effects/shared.effects';

@NgModule({
  declarations: [ModalConfirmComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    // StoreModule.forFeature('shared', sharedReducer),
    EffectsModule.forFeature([SharedEffects]),
  ],
  exports: [ModalConfirmComponent],
})
export class SharedModule {}
