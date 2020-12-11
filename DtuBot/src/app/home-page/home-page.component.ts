import {Component, OnInit} from '@angular/core';
import {JwtService} from '../login/services/jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  roles: string[];
  userId: string;
  checkAdmin = false;
  username: string;

  constructor(
    private jwt: JwtService, private router: Router) {
    // dòng lệnh bắt login mới vào homepage
    try {
      this.roles = jwt.getAuthorities();
      if (this.roles[0] === 'ROLE_ADMIN') {
        this.checkAdmin = true;
      }
    } catch (e) {
      this.roles = [];
    }
    if (this.roles.length === 0) {
      router.navigateByUrl('login');
    }
  }

  logOut(): void {
    if (window.confirm('Bạn muốn đăng xuất tài khoản không ?')) {
      this.jwt.logOut();
      window.location.reload();
      window.location.href = 'login';

    }
    this.jwt.saveUsername(window.localStorage.getItem('usernameRemember'));
  }

  ngOnInit(): void {
  }

}
