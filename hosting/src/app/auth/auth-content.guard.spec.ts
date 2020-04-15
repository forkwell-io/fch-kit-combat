import {TestBed} from '@angular/core/testing';

import {AuthContentGuard} from './auth-content.guard';

describe('AuthContentGuard', () => {
  let guard: AuthContentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthContentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
