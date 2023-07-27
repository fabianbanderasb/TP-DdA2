import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  apiUrl = `${environment.apiUrl}/logs`;

  constructor(private httpClient: HttpClient) {}

  getAll(valveId: number): Observable<Log[]> {
    return this.httpClient.get<Log[]>(`${this.apiUrl}/${valveId}`);
  }
}
