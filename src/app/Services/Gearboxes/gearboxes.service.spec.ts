import { TestBed } from '@angular/core/testing';

import { GearboxesService } from './gearboxes.service';

describe('GearboxesService', () => {
  let service: GearboxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GearboxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
