import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { MeasurementUnitModule } from 'src/app/pipes/measurement-unit/measurement-unit.module';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Measurement } from 'src/app/models/measurement';
import { MeasurementService } from 'src/app/services/measurement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MeasurementUnitModule]
})
export class MeasurementsPage implements ViewWillEnter {

  measurements$!: Observable<Measurement[]>;

  deviceId!: number;

  isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);

  constructor(private measurementService: MeasurementService, private actRout: ActivatedRoute) {}

  ionViewWillEnter(): void {
    this.getDeviceId();
    this.getMeasurements();
  }

  private getDeviceId(): void {
    this.deviceId = Number(this.actRout.snapshot.paramMap.get('id'));
  }

  private getMeasurements(): void {
    this.measurements$ = this.measurementService.getAll(this.deviceId).pipe(finalize(() => {this.isLoading$.next(false);}));
  }
}
