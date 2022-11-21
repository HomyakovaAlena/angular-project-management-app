import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PmAppModule } from './pm-app/pm-app.module';
import { CoreModule } from './core/core.module';
import { BoardsModule } from './boards/boards.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { appReducer } from './store/reducers/app.reducer';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { UsersModule } from './users/users.module';
// import { DragDropModule } from '@angular/cdk/drag-drop';
!environment.production ? StoreDevtoolsModule.instrument() : [];
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
    StoreModule.forRoot({ app: appReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    // UsersModule,
    // DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
