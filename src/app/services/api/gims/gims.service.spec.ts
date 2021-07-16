import { TestBed } from '@angular/core/testing';

import { GimsService } from './gims.service';

describe('GimsService', () => {
  let service: GimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
