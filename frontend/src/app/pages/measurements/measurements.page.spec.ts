import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeasurementsPage } from './measurements.page';

describe('MeasurementsPage', () => {
  let component: MeasurementsPage;
  let fixture: ComponentFixture<MeasurementsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeasurementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
