import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NonAnswer} from '../model/nonAnswer';
import {Intents} from '../model/intents';

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

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + '/delete-nonAnswer/' + id);
  }

  save(nonAnswer: NonAnswer): Observable<Intents> {
    return this.httpClient.post<Intents>(this.URL + '/save-nonAnswer', nonAnswer);
  }

  findNonAnswerById(id: number): Observable<NonAnswer> {
    return this.httpClient.get<NonAnswer>(this.URL + '/get-nonAnswer/' + id);
  }
}
