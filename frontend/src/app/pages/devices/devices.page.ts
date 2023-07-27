import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { DeviceService } from 'src/app/services/device.service';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Device } from 'src/app/models/device';
import { MeasurementUnitModule } from 'src/app/pipes/measurement-unit/measurement-unit.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MeasurementUnitModule, RouterLink],
})
export class DevicesPage implements ViewWillEnter {
  devices$!: Observable<Device[]>;

  isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);

  constructor(private deviceService: DeviceService) {}

  ionViewWillEnter(): void {
    this.getDevices();
  }

  private getDevices(): void {
    this.devices$ = this.deviceService.getAll().pipe(finalize(() => {this.isLoading$.next(false);}));
  }

}
