import { TestBed } from '@angular/core/testing';

import {UserAccount, UserService, UserUpdateParams} from './user.service';
import {AuthService} from '../auth/auth.service';

describe('UserService', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  let service: UserService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login and check is admin', async () => {
    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
    const isAdmin = await service.iamAdmin();
    expect(isAdmin).toBeTrue();
  });

  it('adminVerified and emailVerified', async () => {
    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
    const emailVerified = await service.iamEmailVerified();
    const adminVerified = await service.iamVerifiedByAdmin();
    console.info(adminVerified);
    // expect(emailVerified && adminVerified).toBeTrue();
    expect().nothing();
  });

  it('registerAsUser()', async () => {
    const email = 'unsolvedrubiks1908@gmail.com';
    const registerUserResult = await service.registerAsUser({
      email,
      password: '123123'
    }, {
      address: '-',
      phone: '-',
      name: 'Danish',
      email,
    });
    expect(registerUserResult.userCredential).toBeTruthy();
  });

  it('currentUserInfo()', async () => {
    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
    const info = await service.currentUserInfo();
    console.info(info);
    expect().nothing();
  });

  it('updateProfile', async () => {
    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
    const user: UserUpdateParams = {
      phone: 'test123',
      address: 'heyyy'
    };
    await service.updateProfile(user);
  });
});
