import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminManagerComponent} from './admin-manager/admin-manager.component';
import {RouterModule, Routes} from '@angular/router';
import {ReportNonAnswerComponent} from './report-non-answer/report-non-answer.component';

const routes: Routes = [
  {path: '', component: AdminManagerComponent,},
  {path: 'non-answer', component: ReportNonAnswerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
