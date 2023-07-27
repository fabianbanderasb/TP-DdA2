import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { StatusHighlightModule } from 'src/app/directives/status-highlight/status-highlight.module';
import { MeasurementUnitModule } from 'src/app/pipes/measurement-unit/measurement-unit.module';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ValveService } from 'src/app/services/valve.service';
import * as Highcharts from 'highcharts/highcharts';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { HighchartsChartModule } from 'highcharts-angular';
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StatusHighlightModule,
    MeasurementUnitModule,
    RouterLink,
    HighchartsChartModule
  ],
})
export class DeviceDetailPage implements ViewWillEnter {
  @ViewChild("container", { read: ElementRef }) container: ElementRef | undefined;

  device$!: Observable<Device>;

  deviceId!: number;

  device!: Device;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);

  constructor(
    private deviceService: DeviceService,
    private valveService: ValveService,
    private actRout: ActivatedRoute
  ) {}

  ionViewWillEnter(): void {
    this.getDeviceId();
    this.getDevice();
  }

  private getDeviceId(): void {
    this.deviceId = Number(this.actRout.snapshot.paramMap.get('id'));
  }

  private getDevice(): void {
    this.device$ = this.deviceService.getOne(this.deviceId).pipe(

      tap((device: Device) => {
        this.device = device,
        this.makeGaugeChart();
      }),
      finalize(() => this.isLoading$.next(false))
    );
  }

  public toggleValve(valveId: number ): void {
    this.valveService.toggleValve(valveId).subscribe(() => {
      this.getDevice();
    });
  }

  public makeGaugeChart(): void {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBorderWidth: 0,
          plotShadow: false,
        }
        ,title: {
          text: this.device.name
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: 'kPA'
        },
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 60,
            color: 'orange' // red
        },
      {
        from: 60,
        to: 100,
        color: '#DF5353'
      }]

        },

    series: [{
        name: 'Cb',
        type: 'gauge',
        data: [this.device.lastMeasurement?.value!],
        tooltip: {
            valueSuffix: ' Cb'
        },
    }]

    };

  }
}
