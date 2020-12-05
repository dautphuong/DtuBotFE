import {Component, OnInit} from '@angular/core';
import {NonAnswer} from '../model/nonAnswer';
import {ReportNonAnswerService} from '../service/report-non-answer.service';
import {Report} from '../model/report';
import {ReportService} from '../service/report.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  listNonAnswer: NonAnswer[];
  checkReport = false;
  listReport: Report[];

  constructor(private nonAnswrService: ReportNonAnswerService,
              private reportService: ReportService) {

  }

  ngOnInit(): void {
    this.onClickReport();
  }

  // tslint:disable-next-line:typedef
  onClickNonAnswer() {
    this.checkReport = true;
    this.nonAnswrService.findReport().subscribe(next => {
      this.listNonAnswer = next;
    });
  }

  // tslint:disable-next-line:typedef
  onClickReport() {
    this.checkReport = false;
    this.reportService.findReport().subscribe(next => {
      this.listReport = next;
    });
  }
}
