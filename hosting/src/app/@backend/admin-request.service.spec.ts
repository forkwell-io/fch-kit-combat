import { TestBed } from '@angular/core/testing';

import { AdminRequestService } from './admin-request.service';

describe('AdminRequestService', () => {
  let service: AdminRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
