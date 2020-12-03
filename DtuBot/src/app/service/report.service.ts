import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../model/report';
import {Intents} from '../model/intents';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(this.URL + '/list-report');
  }

  save(report: Report): Observable<Intents> {
    return this.httpClient.post<Intents>(this.URL + '/save-report', report);
  }

  findReportById(id: number): Observable<Report> {
    return this.httpClient.get<Report>(this.URL + '/get-report/' + id);
  }
}
