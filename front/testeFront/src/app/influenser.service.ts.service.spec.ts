import { TestBed } from '@angular/core/testing';

import { InfluenserServiceTsService } from './influenser.service.ts.service';

describe('InfluenserServiceTsService', () => {
  let service: InfluenserServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluenserServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
