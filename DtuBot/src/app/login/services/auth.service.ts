import { LoginInfo } from '../models/login-info';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import {JwtService} from './jwt.service';
import { SocialSignUpInfo } from '../models/social-signup-info';
import {User} from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_LOGIN_API = 'http://localhost:8080/login';
  private AUTH_SOCIAL_SIGNUP_API = 'http://localhost:8080/register';

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.userSubject.asObservable();

  constructor(private http: HttpClient,
              private jwtService: JwtService) { }

  authLogin(loginInfo: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.AUTH_LOGIN_API, loginInfo, httpOptions);
  }

  signUpSocialUser(socialSignUpInfo: SocialSignUpInfo): Observable<string> {
    return this.http.post(this.AUTH_SOCIAL_SIGNUP_API, socialSignUpInfo,  {responseType: 'text'});
  }

  getCurrentUser(): void {
    if (this.jwtService.getToken()) {
      this.http.get<User>(this.AUTH_LOGIN_API + 'me', httpOptions).subscribe((user) => {
        if (user) {
          this.userSubject.next(user);
        }
      });
    } else {
      this.userSubject.next(null);
    }
  }
}
