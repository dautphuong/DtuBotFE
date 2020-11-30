import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminManagerComponent} from './admin-manager/admin-manager.component';
import {LoginModule} from './login/login.module';
import {httpInterceptorProviders} from './login/auth/auth-http.interceptor';
import {AdminManagerService} from './service/admin-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminManagerComponent,

  ],
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders, AdminManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
