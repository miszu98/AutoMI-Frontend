import { TestBed } from '@angular/core/testing';

import { CarOffersService } from './car-offers.service';

describe('CarOffersService', () => {
  let service: CarOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
