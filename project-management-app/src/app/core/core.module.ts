import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

import { LocalizationSwitcherComponent } from './components/localization-switcher/localization-switcher.component';

import { AllBoardsButtonComponent } from './components/all-boards-button/all-boards-button.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { AuthModule } from '../auth/auth.module';
import { BoardsModule } from '../boards/boards.module';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NotFoundPageComponent,
        ProgressBarComponent,
        LocalizationSwitcherComponent,
        AllBoardsButtonComponent,
    ],
    exports: [HeaderComponent, FooterComponent, NotFoundPageComponent, ProgressBarComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatIconModule,
        CoreRoutingModule,
        AuthModule,
        BoardsModule,
        MatCardModule,
        SharedModule,
    ]
})
export class CoreModule {}
