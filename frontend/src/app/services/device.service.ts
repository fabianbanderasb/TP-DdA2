import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  apiUrl = `${environment.apiUrl}/devices`;

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.apiUrl);
  }

  getOne(deviceId: number): Observable<Device> {
    return this.httpClient.get<Device>(`${this.apiUrl}/${deviceId}`);
  }

}
