import { TestBed } from '@angular/core/testing';

import { BookinService } from './bookin.service';

describe('BookinService', () => {
  let service: BookinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
