import { TestBed } from '@angular/core/testing';

import { DrivingGearsService } from './driving-gears.service';

describe('DrivingGearsService', () => {
  let service: DrivingGearsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrivingGearsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
