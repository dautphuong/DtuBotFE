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


}
