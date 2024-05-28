/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoomDetailsService } from './room-details.service';

describe('Service: RoomDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomDetailsService]
    });
  });

  it('should ...', inject([RoomDetailsService], (service: RoomDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
