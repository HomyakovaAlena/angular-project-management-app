import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { PmAppRoutingModule } from './pm-app-routing.module';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, PmAppRoutingModule],
  exports: [WelcomePageComponent],
})
export class PmAppModule {}
