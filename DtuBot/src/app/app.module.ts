import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminManagerComponent} from './admin-manager/admin-manager.component';
import {LoginModule} from './login/login.module';
import {httpInterceptorProviders} from './login/auth/auth-http.interceptor';
import {AdminManagerService} from './service/admin-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {ReportNonAnswerComponent} from './report-non-answer/report-non-answer.component';
import {ReportComponent} from './report/report.component';
import {HistoryComponent} from './history/history.component';
import {DatePipe} from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    AdminManagerComponent,
    ReportNonAnswerComponent,
    ReportComponent,
    HistoryComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [httpInterceptorProviders, AdminManagerService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
