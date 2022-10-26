import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PmAppModule } from './pm-app/pm-app.module';
import { CoreModule } from './core/core.module';
import { BoardsModule } from './boards/boards.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PmAppModule,
    CoreModule,
    BoardsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
