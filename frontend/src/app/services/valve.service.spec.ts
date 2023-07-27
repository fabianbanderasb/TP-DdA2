import { TestBed } from '@angular/core/testing';

import { ValveService } from './valve.service';

describe('ValveService', () => {
  let service: ValveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
