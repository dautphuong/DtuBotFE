import {Component} from '@angular/core';
import {AdminManagerService} from './service/admin-manager.service';
import {JwtService} from './login/services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DtuBot';

  constructor(
    private jwt: JwtService) {
  }

  logOut(): void {
    if (window.confirm('Bạn muốn đăng xuất tài khoản không ?')) {
      this.jwt.logOut();
      window.location.reload();
    }
    this.jwt.saveUsername(window.localStorage.getItem('usernameRemember'));
  }
}
