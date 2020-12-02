import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NonAnswer} from '../model/nonAnswer';

@Injectable({
  providedIn: 'root'
})
export class ReportNonAnswerService {
  URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<NonAnswer[]> {
    return this.httpClient.get<NonAnswer[]>(this.URL + '/list-nonAnswer');
  }

  findReport(): Observable<NonAnswer[]> {
    return this.httpClient.get<NonAnswer[]>(this.URL + '/list-nonAnswer-report');
  }
}
