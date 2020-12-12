import {Component, OnInit} from '@angular/core';
import {AdminManagerService} from '../service/admin-manager.service';
import {Intents} from '../model/intents';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtService} from '../login/services/jwt.service';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent implements OnInit {
  listIntent: Intents[];
  intent = new Intents();
  tagForm: FormGroup;
  patternForm: FormGroup;
  responseForm: FormGroup;
  isTag = true;
  isAddTag = true;
  valueIntent: Intents;
  test: string;

  constructor(
    private adminManagerService: AdminManagerService,
    private jwt: JwtService,
    private fb: FormBuilder
  ) {
    this.tagForm = this.fb.group({
      tag: ['', [Validators.required]],
      patterns: [[]],
      responses: [[]]
    });
    this.patternForm = this.fb.group({
      pattern: ['', [Validators.required]]
    });
    this.responseForm = this.fb.group({
      response: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.adminManagerService.findAll().subscribe(next => {
      this.listIntent = next;
    });
  }

  // tslint:disable-next-line:typedef
  onClick(tag: string) {
    try{
    document.getElementById('id' + this.intent.tag).style.color = 'gray';
    }catch (e) {
      console.log('null');
    }
    this.intent = new Intents();
    this.adminManagerService.findTag(tag).subscribe(next => {
      this.intent = next;
    }, error => {
    }, () => {
      this.isTag = false;
      document.getElementById('id' + tag).style.color = 'red';
    });
  }


  // tslint:disable-next-line:typedef
  onSubmitTag() {
    this.intent = Object.assign({}, this.tagForm.value);
    this.adminManagerService.save(this.intent).subscribe();
    window.location.reload();
  }


  // tslint:disable-next-line:typedef
  onSubmitPattern() {
    const listPatten = this.patternForm.controls['pattern'].value.replace(/  +/g, '').trim().split('#');
    const intent1 = this.intent;
    // tslint:disable-next-line:only-arrow-functions typedef
    listPatten.forEach(function(value) {
      // tslint:disable-next-line:triple-equals
      if (value != '') {
        intent1.patterns.push(value);
      }
    });
    // console.log(intent1);
    // this.intent.patterns.push(this.patternForm.controls['pattern'].value);
    this.adminManagerService.save(this.intent).subscribe();
  }

  // tslint:disable-next-line:typedef
  onSubmitResponse() {
    const listResponse = this.responseForm.controls['response'].value.replace(/  +/g, '').trim().split('#');
    const response1 = this.intent;
    // tslint:disable-next-line:only-arrow-functions typedef
    listResponse.forEach(function(value) {
      // tslint:disable-next-line:triple-equals
      if (value != '') {
        response1.responses.push(value);
      }
    });
    this.adminManagerService.save(this.intent).subscribe();
  }

  deleteTag(tag: string): void {
    if (window.confirm('Bạn có chắc xóa ' + tag + ' ?')) {
      this.adminManagerService.delete(tag).subscribe();
      window.location.reload();
    }
  }

  deleteReponse(response: string): void {
    if (window.confirm('Bạn có chắc xóa ' + response + ' ?')) {
      this.intent.responses = this.intent.responses.filter(item => item !== response);
      this.adminManagerService.save(this.intent).subscribe();
    }
  }

  deletePattern(pattern: string): void {
    if (window.confirm('Bạn có chắc xóa ' + pattern + ' ?')) {
      this.intent.patterns = this.intent.patterns.filter(item => item !== pattern);
      this.adminManagerService.save(this.intent).subscribe();
    }
  }

  // tslint:disable-next-line:typedef
  checkAdd() {
    this.adminManagerService.findTag(this.tagForm.controls['tag'].value).subscribe(next => {
      this.valueIntent = next;
    }, error => {
    }, () => {
      this.isAddTag = this.valueIntent != null;
    });
  }
}
