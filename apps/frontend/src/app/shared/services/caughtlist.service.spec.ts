import { TestBed } from '@angular/core/testing';

import { CaughtlistService } from './caughtlist.service';

describe('CaughtlistService', () => {
  let service: CaughtlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaughtlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
