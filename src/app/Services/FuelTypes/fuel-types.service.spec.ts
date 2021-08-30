import { TestBed } from '@angular/core/testing';

import { FuelTypesService } from './fuel-types.service';

describe('FuelTypesService', () => {
  let service: FuelTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
