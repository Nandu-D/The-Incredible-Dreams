import { TestBed } from '@angular/core/testing';

import { RandomParticipantService } from './random-participant.service';

describe('RandomParticipantService', () => {
  let service: RandomParticipantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomParticipantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
