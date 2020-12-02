import {Component, OnInit} from '@angular/core';
import {AdminManagerService} from '../service/admin-manager.service';
import {Intents} from '../model/intents';
import {FormGroup} from '@angular/forms';
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

  constructor(private adminManagerService: AdminManagerService,
              private jwt: JwtService) {
  }

  ngOnInit(): void {
    this.adminManagerService.findAll().subscribe(next => {
      this.listIntent = next;
    });
  }

  // tslint:disable-next-line:typedef
  onClick(tag: string) {
    this.intent = new Intents();
    this.adminManagerService.findTag(tag).subscribe(next => {
      this.intent = next;
      console.log(this.intent);
    });
  }



  // tslint:disable-next-line:typedef
  onSubmitTag() {

  }

  // tslint:disable-next-line:typedef
  onSubmitPattern() {

  }

  // tslint:disable-next-line:typedef
  onSubmitResponse() {

  }
}
