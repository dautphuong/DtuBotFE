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
  valueIntent: Intents;

  constructor(private nonAnswrService: ReportNonAnswerService,
              private adminManagerService: AdminManagerService,
              private fb: FormBuilder,
              private jwt: JwtService,
              private datePipe: DatePipe) {
    this.nonAnswrService.findAll().subscribe(next => {
      this.listNonAnswer = next;
    });
    this.intentForm = this.fb.group({
      tagStr: ['', [Validators.required]],
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
    this.adminManagerService.findTag(this.intentForm.controls['tagStr'].value).subscribe(next => {
      this.valueIntent = next;
    }, error => {
    }, () => {
      console.log(this.valueIntent);
      if (this.valueIntent == null) {
        this.intent = Object.assign({}, this.intentForm.value);
        this.intent.patterns = this.intentForm.controls['patternStr'].value.split('#');
        this.intent.responses = this.intentForm.controls['responseStr'].value.split('#');
      } else {
        const listPatten = this.intentForm.controls['patternStr'].value.replace(/  +/g, '').trim().split('#');
        const listResponse = this.intentForm.controls['responseStr'].value.replace(/  +/g, '').trim().split('#');
        const intent1 = this.valueIntent;
        // tslint:disable-next-line:only-arrow-functions typedef
        listPatten.forEach(function(value) {
          // tslint:disable-next-line:triple-equals
          if (value != '') {
            intent1.patterns.push(value);
          }
        });
        // tslint:disable-next-line:only-arrow-functions typedef
        listResponse.forEach(function(value) {
          // tslint:disable-next-line:triple-equals
          if (value != '') {
            intent1.responses.push(value);
          }
        });
      }
      this.adminManagerService.save(this.valueIntent).subscribe();
    });


    // this.nonAnswer.respondent = this.jwt.getUsername();
    this.nonAnswer.responseTime = this.datePipe.transform(this.myDate, 'HH:mm:ss MM-dd-yyyy').toString();
    console.log(this.nonAnswer);
    this.nonAnswrService.save(this.nonAnswer).subscribe();
    // window.location.reload();
  }

}
