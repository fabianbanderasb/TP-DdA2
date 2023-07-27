import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Valve } from '../models/valve';

@Injectable({
  providedIn: 'root',
})
export class ValveService {
  apiUrl = `${environment.apiUrl}/valves`;

  constructor(private httpClient: HttpClient) {}

  getOne(valveId: number): Observable<Valve> {
    return this.httpClient.get<Valve>(`${this.apiUrl}/${valveId}`);
  }

  toggleValve(valveId: number): Observable<Valve> {
    return this.httpClient.put<Valve>(`${this.apiUrl}/${valveId}`, null);
  }
}
