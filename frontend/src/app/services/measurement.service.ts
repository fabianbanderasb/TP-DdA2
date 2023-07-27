import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Measurement } from '../models/measurement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  apiUrl = `${environment.apiUrl}/measurements`;

  constructor(private httpClient: HttpClient) {}

  getAll(deviceId: number): Observable<Measurement[]> {
    return this.httpClient.get<Measurement[]>(`${this.apiUrl}/${deviceId}`);
  }

}
