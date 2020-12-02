import {Component, OnInit} from '@angular/core';
import {NonAnswer} from '../model/nonAnswer';
import {ReportNonAnswerService} from '../service/report-non-answer.service';

@Component({
  selector: 'app-report-non-answer',
  templateUrl: './report-non-answer.component.html',
  styleUrls: ['./report-non-answer.component.css']
})
export class ReportNonAnswerComponent implements OnInit {
  listNonAnswer: NonAnswer[];


  constructor(private nonAnswrService: ReportNonAnswerService) {
    this.nonAnswrService.findAll().subscribe(next => {
      this.listNonAnswer = next;
      console.log(this.listNonAnswer);
    });
  }

  ngOnInit(): void {
  }

}
