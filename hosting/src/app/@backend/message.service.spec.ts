import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import {LeaveMessageBuilder} from '../../@core/leaveMessage';
import {AuthService} from '../auth/auth.service';
import {UserAccount, UserService} from './user.service';
import {UserBase} from '../../@core/firestore-interfaces/user';

describe('MessageService', () => {
  let service: MessageService;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);

    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendMessage', async () => {
    const userInfo = await userService.currentUserInfo();
    const user: UserBase = {
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email
    };
    const lmb = new LeaveMessageBuilder(
      'EHClufIkf0p8n7iiOYs5',
      user,
      'Hey!',
      'How you doin?'
    );
    await service.sendMessage(lmb);
    expect().nothing();
  });
});
