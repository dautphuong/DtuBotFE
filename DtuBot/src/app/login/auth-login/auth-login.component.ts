import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginInfo} from '../models/login-info';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {JwtService} from '../services/jwt.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  subscription: Subscription;
  loginForm: FormGroup;
  loginInfo: LoginInfo;
  isLogInFailed = false;

  userId: string;
  roles: string[] = [];
  username: string;
  email: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private jwtService: JwtService,
              private router: Router,
  ) {
  }

  onLogin(): void {
    this.loginInfo = new LoginInfo(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.authLogin(this.loginInfo);

  }

  authLogin(loginInfo: LoginInfo): void {
    this.subscription = this.authService.authLogin(loginInfo).subscribe({
      next: data => {
        this.jwtService.saveUserId(data.userId);
        this.jwtService.saveToken(data.token);
        this.jwtService.saveUsername(data.username);
        this.jwtService.saveAuthorities(data.authorities);
        this.jwtService.saveEmail(data.email);
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.isLogInFailed = true;
      }
    });
  }


  ngOnInit(): void {
    this.jwtService.logOut();

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(15)]]
    });

    if (this.jwtService.getToken()) {
      this.username = this.jwtService.getUsername();
      this.roles = this.jwtService.getAuthorities().map(r => r.replace('ROLE_', '').toLowerCase());
      this.email = this.jwtService.getEmail();
    }
  }

}
