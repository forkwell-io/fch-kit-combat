import { TestBed } from '@angular/core/testing';

import { RequestService } from './request.service';

import {UserAccount, UserService} from './user.service';
import {AuthService} from '../auth/auth.service';
import {LeaveMessageBuilder} from '../../@core/leaveMessage';
import {UserBase} from '../../@core/firestore-interfaces/user';

describe('RequestService', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  let service: RequestService;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestService);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);

    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRequests()', async () => {
    const requests = await service.getRequests();
    console.info(requests);
    expect().nothing();
  });
});
