import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthLoginComponent} from './auth-login/auth-login.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {JwtService} from './services/jwt.service';
import {AuthHttpInterceptor} from './auth/auth-http.interceptor';
import {FormatUsernameService} from './services/format-username.service';



@NgModule({
  declarations: [AuthLoginComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, JwtService, AuthHttpInterceptor, FormatUsernameService]
})
export class LoginModule { }
