import {Component, OnInit} from '@angular/core';
import {NonAnswer} from '../model/nonAnswer';
import {ReportNonAnswerService} from '../service/report-non-answer.service';
import {AdminManagerService} from '../service/admin-manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Intents} from '../model/intents';
import {JwtService} from '../login/services/jwt.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-report-non-answer',
  templateUrl: './report-non-answer.component.html',
  styleUrls: ['./report-non-answer.component.css']
})
export class ReportNonAnswerComponent implements OnInit {
  listNonAnswer: NonAnswer[];
  intentForm: FormGroup;
  intent = new Intents();
  nonAnswer = new NonAnswer();
  myDate = new Date();

  constructor(private nonAnswrService: ReportNonAnswerService,
              private adminManagerService: AdminManagerService,
              private fb: FormBuilder,
              private jwt: JwtService,
              private datePipe: DatePipe) {
    this.nonAnswrService.findAll().subscribe(next => {
      this.listNonAnswer = next;
      console.log(this.listNonAnswer);
    });
    this.intentForm = this.fb.group({
      tag: ['', [Validators.required]],
      patternStr: ['', [Validators.required]],
      responseStr: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    if (window.confirm('Bạn có chắc xóa không ?')) {
      this.nonAnswrService.delete(id).subscribe();
      window.location.reload();
    }
  }

  // tslint:disable-next-line:typedef
  onClick(id: number, str: string) {
    this.intentForm.patchValue({patternStr: str});
    this.nonAnswrService.findNonAnswerById(id).subscribe(next => {
      this.nonAnswer = next;
      console.log(this.nonAnswer);
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.intent = Object.assign({}, this.intentForm.value);
    this.intent.patterns = this.intentForm.controls['patternStr'].value.split('#');
    this.intent.responses = this.intentForm.controls['responseStr'].value.split('#');
    this.adminManagerService.save(this.intent).subscribe();

    this.nonAnswer.respondent = this.jwt.getUsername();
    this.nonAnswer.responseTime = this.datePipe.transform(this.myDate, 'HH:mm:ss MM-dd-yyyy').toString();
    console.log(this.nonAnswer);
    this.nonAnswrService.save(this.nonAnswer).subscribe();
    window.location.reload();
  }

}
