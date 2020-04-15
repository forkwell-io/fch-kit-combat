import { TestBed } from '@angular/core/testing';

import { AdminContribService } from './admin-contrib.service';

describe('AdminContribService', () => {
  let service: AdminContribService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminContribService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
