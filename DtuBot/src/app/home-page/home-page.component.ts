import {Component, OnInit} from '@angular/core';
import {JwtService} from '../login/services/jwt.service';
import {Router} from '@angular/router';
import {AdminManagerService} from '../service/admin-manager.service';

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
    private jwt: JwtService, private router: Router,
    private adminManagerService: AdminManagerService) {
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
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  trainBot() {
    document.getElementById('body').style.cursor = 'wait';
    this.adminManagerService.trainBot().subscribe(next => {
      alert('Done.');
      window.location.reload();
    }, error => {
      alert('Done.');
      window.location.reload();
    });
  }
}
