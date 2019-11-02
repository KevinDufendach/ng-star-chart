import { TestBed } from '@angular/core/testing';

import { EnvironmentManagerService } from './environment-manager.service';

describe('EnvironmentManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvironmentManagerService = TestBed.get(EnvironmentManagerService);
    expect(service).toBeTruthy();
  });
});
