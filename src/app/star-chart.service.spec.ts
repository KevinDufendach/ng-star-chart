import { TestBed } from '@angular/core/testing';

import { StarChartService } from './star-chart.service';

describe('StarChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarChartService = TestBed.get(StarChartService);
    expect(service).toBeTruthy();
  });
});
