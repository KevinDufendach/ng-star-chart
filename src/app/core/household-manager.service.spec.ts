import { TestBed } from '@angular/core/testing';

import { HouseholdManagerService } from './household-manager.service';

describe('HouseholdManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseholdManagerService = TestBed.get(HouseholdManagerService);
    expect(service).toBeTruthy();
  });
});
