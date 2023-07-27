import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementUnitPipe } from './measurement-unit.pipe';

@NgModule({
  declarations: [MeasurementUnitPipe],
  imports: [CommonModule],
  exports: [MeasurementUnitPipe],
})
export class MeasurementUnitModule {}
