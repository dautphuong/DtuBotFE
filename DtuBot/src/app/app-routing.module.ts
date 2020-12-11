import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminManagerComponent} from './admin-manager/admin-manager.component';
import {RouterModule, Routes} from '@angular/router';
import {ReportNonAnswerComponent} from './report-non-answer/report-non-answer.component';
import {ReportComponent} from './report/report.component';
import {HistoryComponent} from './history/history.component';
import {AuthLoginComponent} from './login/auth-login/auth-login.component';
import {HomePageComponent} from './home-page/home-page.component';

const routes: Routes = [
  {path: 'login', component: AuthLoginComponent},
  {
    path: '', component: HomePageComponent, children: [
      {path: '', component: AdminManagerComponent},
      {path: 'non-answer', component: ReportNonAnswerComponent},
      {path: 'report', component: ReportComponent},
      {path: 'history', component: HistoryComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
