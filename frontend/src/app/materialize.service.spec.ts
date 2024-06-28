import { TestBed } from '@angular/core/testing';

import { MaterializeService } from './materialize.service';

describe('MaterializeService', () => {
  let service: MaterializeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterializeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
