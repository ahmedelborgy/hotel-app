import { TestBed } from '@angular/core/testing';

import { AdsUserService } from './user.service';

describe('AdsUserService', () => {
  let service: AdsUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdsUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
