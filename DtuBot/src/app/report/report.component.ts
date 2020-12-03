import {Component, OnInit} from '@angular/core';
import {ReportService} from '../service/report.service';
import {Report} from '../model/report';
import {JwtService} from '../login/services/jwt.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  listReport: Report[];
  report = new Report();
  myDate = new Date();

  constructor(private reportService: ReportService,
              private jwt: JwtService,
              private datePipe: DatePipe
  ) {
    reportService.findAll().subscribe(next => {
      this.listReport = next;
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  isView(id: number) {
    this.reportService.findReportById(id).subscribe(next => {
      this.report = next;
    }, error => {
    }, () => {
      this.report.respondent = this.jwt.getUsername();
      this.report.responseTime = this.datePipe.transform(this.myDate, 'HH:mm:ss MM-dd-yyyy').toString();
      console.log(this.report);
      this.reportService.save(this.report).subscribe();
    });
  }
}
