import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { PmAppRoutingModule } from './pm-app-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, PmAppRoutingModule, MatIconModule],
  exports: [WelcomePageComponent],
})
export class PmAppModule {}
