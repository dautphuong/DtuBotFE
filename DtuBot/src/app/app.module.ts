import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminManagerComponent} from './admin-manager/admin-manager.component';
import {LoginModule} from './login/login.module';
import {httpInterceptorProviders} from './login/auth/auth-http.interceptor';
import {AdminManagerService} from './service/admin-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { ReportNonAnswerComponent } from './report-non-answer/report-non-answer.component';
import { ReportComponent } from './report/report.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminManagerComponent,
    ReportNonAnswerComponent,
    ReportComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders, AdminManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
