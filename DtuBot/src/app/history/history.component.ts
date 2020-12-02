import {Component, OnInit} from '@angular/core';
import {NonAnswer} from '../model/nonAnswer';
import {ReportNonAnswerService} from '../service/report-non-answer.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  listNonAnswer: NonAnswer[];
  checkReport = false;

  constructor(private nonAnswrService: ReportNonAnswerService) {

  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onClickNonAnswer() {
    this.checkReport = true;
    this.nonAnswrService.findReport().subscribe(next => {
      this.listNonAnswer = next;
      console.log(this.listNonAnswer);
    });
  }

  onClickReport() {
    this.checkReport = false;

  }
}
