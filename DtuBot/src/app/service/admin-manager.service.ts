import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Intents} from '../model/intents';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {
  URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Intents[]> {
    return this.httpClient.get<Intents[]>(this.URL + '/list-tag');
  }

  findTag(tag: string): Observable<Intents> {
    return this.httpClient.get<Intents>(this.URL + '/get-tag/' + tag);
  }
}
